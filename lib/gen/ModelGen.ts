/**
 * Created by yanshaowen on 2018/12/13.
 */
import { writeFile } from "fs"
import { join } from "path"
import { createConnection } from "typeorm"
import {ConvertUtil}  from "../util/ConvertUtil"
import { GenConfig }  from "../config/GenConfig"
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
export class ModelGen{

    typeormConfig : ConnectionOptions;
    genConfig : GenConfig;
    public constructor(_typeormConfig: ConnectionOptions) {
        this.typeormConfig = _typeormConfig;
    }
    public gen(_genConfig: GenConfig): Promise<boolean> {
        this.genConfig = _genConfig;
        return this.mysqlGen();
    }

    private async mysqlGen(): Promise<boolean> {
        const connection = await createConnection(this.typeormConfig);
        let tab = ''
        for (let len = this.genConfig.spaceLength; len > 0; len--) {
            tab += ' '
        }
        let tsNumber = ['int', 'tinyint', 'smallint', 'mediumint', 'bigint', 'float', 'double', 'dec', 'decimal', 'numeric']
        let tsDate = ["date", "datetime", "timestamp", "time", "year"]
        let tsString = [ "char", "varchar", "nvarchar", "text", "tinytext", "mediumtext"]
        let tsJson = ['json']
        let tsBool = ['bool, boolean']
        let desc = await connection.query('DESC '+ this.genConfig.tableName);
        let model = 'import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm"\r\n';
        if (this.genConfig.isEndSemicolon)  {
            model += ';'
        }
        model += '\r\n'
        model += `@Entity('${this.genConfig.tableName}')\r\n`
        model += 'export class ' +  this.genConfig.modelName + '{\r\n'
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
                model += `${tab}${ConvertUtil.toHump(col.Field)}: ${type};\r\n\r\n`
            }
        })
        model += '}'
        if (this.typeormConfig.cli.entitiesDir) {
            writeFile(join(this.typeormConfig.cli.entitiesDir, this.genConfig.modelName + '.ts'), model, 'utf8', function (e) {
                console.error(e)
            })
        }
        connection.close();
        return true;


    }
}
