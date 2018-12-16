/**
 * Created by yanshaowen on 2018/12/13.
 */
const ormconfig = require("../ormconfig.json")
import { writeFile } from "fs"
import { join } from "path"
import { createConnection } from "typeorm"

const modelConfig = {
    spaceLength: 4,
    isEndSemicolon: false,
    tableName: 'shell_task',
    modelName: 'ShellTask'
};
export class ModelGen{
    public static async mysqlGen() {
        const connection = await createConnection(ormconfig);
        let tab = ''
        for (let len = modelConfig.spaceLength; len > 0; len--) {
            tab += ' '
        }
        if (ormconfig.type === 'mysql') {
            // mysql类型映射ts类型
            let tsNumber = ['int', 'tinyint', 'smallint', 'mediumint', 'bigint', 'float', 'double', 'dec', 'decimal', 'numeric']
            let tsDate = ["date", "datetime", "timestamp", "time", "year"]
            let tsString = [ "char", "varchar", "nvarchar", "text", "tinytext", "mediumtext"]
            let tsJson = ['json']
            let tsBool = ['bool, boolean']
            let desc = await connection.query('DESC '+ modelConfig.tableName);
            let model = 'import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm"\r\n';
            if (modelConfig.isEndSemicolon)  {
                model += ';'
            }
            model += '\r\n'
            model += `@Entity('${modelConfig.tableName}')\r\n`
            model += 'export class ' +  modelConfig.modelName + '{\r\n'
            desc.forEach(col => {
                let columnName = '';
                if (col.Key === 'PRI') {
                    if (col.Extra === 'auto_increment') {
                        columnName = 'PrimaryGeneratedColumn'
                    } else {
                        columnName = 'PrimaryColumn'
                    }
                } else {
                    columnName = 'Column'
                }

                let type = ''

                for (let t of tsNumber) {
                    if (col.Type.indexOf(t) !== -1) {
                        type = 'number'
                        break
                    }
                }
                for (let t of tsString) {
                    if (col.Type.indexOf(t) !== -1) {
                        type = 'string'
                        break
                    }
                }
                for (let t of tsJson) {
                    if (col.Type.indexOf(t) !== -1) {
                        type = 'object'
                        break
                    }
                }
                for (let t of tsBool) {
                    if (col.Type.indexOf(t) !== -1) {
                        type = 'boolean'
                        break
                    }
                }
                for (let t of tsDate) {
                    if (col.Type.indexOf(t) !== -1) {
                        type = 'Date'
                        break
                    }
                }
                if (type.length === 0) {
                    console.error(`没有找到对应的映射类型,fieldName=${col.Field}, fieldType=${col.Type}`)
                } else {
                    model += `${tab}@${columnName}({name: '${col.Field}'})\r\n`
                    model += `${tab}${this.toHump(col.Field)}: ${type};\r\n\r\n`
                }
            })
            model += '}'
            if (ormconfig.cli.entitiesDir) {
                writeFile(join(ormconfig.cli.entitiesDir, modelConfig.modelName + '.ts'), model, 'utf8', function (e) {
                    console.error(e)
                })
            }
            connection.close()

        } else {
            console.log(`未知的ormconfig配置 type=${ormconfig.type}`)
        }
    }
}
