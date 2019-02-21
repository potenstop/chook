"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanshaowen on 2018/12/13.
 */
const fs_1 = require("fs");
const os = require("os");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const ConvertUtil_1 = require("../util/ConvertUtil");
const ApplicationLog_1 = require("../log/ApplicationLog");
class ModelGen {
    constructor(typeormConfig) {
        this.typeormConfig = typeormConfig;
    }
    gen(genConfig) {
        this.genConfig = genConfig;
        return this.mysqlGen();
    }
    async mysqlGen() {
        const connection = await typeorm_1.createConnection(this.typeormConfig);
        let tab = "";
        for (let len = this.genConfig.spaceLength; len > 0; len--) {
            tab += " ";
        }
        const tsNumber = ["int", "tinyint", "smallint", "mediumint", "bigint", "float", "double", "dec", "decimal", "numeric"];
        const tsDate = ["date", "datetime", "timestamp", "time", "year"];
        const tsString = ["char", "varchar", "nvarchar", "text", "tinytext", "mediumtext"];
        const tsJson = ["json"];
        const tsBool = ["bool, boolean"];
        const desc = await connection.query("DESC " + this.genConfig.tableName);
        let model = "import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from \"typeorm\";";
        if (this.genConfig.isEndSemicolon) {
            model += ";";
        }
        model += ModelGen.endLine;
        model += `@Entity("${this.genConfig.tableName}")${ModelGen.endLine}`;
        model += "export default class " + this.genConfig.modelName + " {" + ModelGen.endLine;
        desc.forEach((col) => {
            let columnName = "";
            if (col.Key === "PRI") {
                if (col.Extra === "auto_increment") {
                    columnName = "PrimaryGeneratedColumn";
                }
                else {
                    columnName = "PrimaryColumn";
                }
            }
            else {
                columnName = "Column";
            }
            let type = "";
            for (const t of tsNumber) {
                if (col.Type.indexOf(t) !== -1) {
                    type = "number";
                    break;
                }
            }
            for (const t of tsString) {
                if (col.Type.indexOf(t) !== -1) {
                    type = "string";
                    break;
                }
            }
            for (const t of tsJson) {
                if (col.Type.indexOf(t) !== -1) {
                    type = "object";
                    break;
                }
            }
            for (const t of tsBool) {
                if (col.Type.indexOf(t) !== -1) {
                    type = "boolean";
                    break;
                }
            }
            for (const t of tsDate) {
                if (col.Type.indexOf(t) !== -1) {
                    type = "Date";
                    break;
                }
            }
            if (type.length === 0) {
                ApplicationLog_1.ApplicationLog.error(`没有找到对应的映射类型,fieldName=${col.Field}, fieldType=${col.Type}`);
            }
            else {
                model += `${tab}@${columnName}({name: "${col.Field}"})${ModelGen.endLine}`;
                model += `${tab}public ${ConvertUtil_1.ConvertUtil.toHump(col.Field)}: ${type};${ModelGen.endLine}${ModelGen.endLine}`;
            }
        });
        model += `}${ModelGen.endLine}`;
        if (this.typeormConfig.cli.entitiesDir) {
            fs_1.writeFile(path_1.join(this.typeormConfig.cli.entitiesDir, this.genConfig.modelName + ".ts"), model, "utf8", (e) => {
                ApplicationLog_1.ApplicationLog.error(`write dao error, path=${path_1.join(this.typeormConfig.cli.entitiesDir, this.genConfig.modelName + ".ts")}`, e);
            });
        }
        connection.close();
        return true;
    }
}
ModelGen.endLine = os.EOL;
exports.ModelGen = ModelGen;
//# sourceMappingURL=ModelGen.js.map