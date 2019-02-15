"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className RestRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 12:54
 */
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const FileUtil_1 = require("../../util/FileUtil");
const Mappers_1 = require("../../core/Mappers");
const path = require("path");
const Beans_1 = require("../../core/Beans");
const TypeDataSource_1 = require("../../data/typeorm/TypeDataSource");
function RestRemote(target) {
    let options = new Options();
    return (target1) => {
        if (typeof target !== "string") {
            options = target;
        }
        else {
            options.filepath = target;
        }
        exec(target1, options);
    };
}
exports.RestRemote = RestRemote;
class Options {
}
function exec(target, options) {
    const ownMetadata = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.REQUEST_MAPPING, target) || new Map();
    const strings = FileUtil_1.FileUtil.findParents(options.filepath);
    let mapperTarget = null;
    for (const str of strings) {
        mapperTarget = Mappers_1.Mappers.getMapper(path.join(str));
        if (mapperTarget) {
            break;
        }
    }
    if (mapperTarget) {
        const beanKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.BEANS, mapperTarget.prototype) || new Set();
        const readDataSources = [];
        const writeDataSources = [];
        beanKeys.forEach((key) => {
            const bean = Beans_1.Beans.getBean(key);
            if (bean.kind) {
                if (bean.kind.split(" ").indexOf("IDataSource") !== -1) {
                    let isReadOnly = false;
                    if (bean instanceof TypeDataSource_1.TypeDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {
                        readDataSources.push(bean);
                    }
                    else {
                        writeDataSources.push(bean);
                    }
                }
            }
        });
        if (writeDataSources.length === 0) {
            throw new Error("RestRemote write dataSource is empty");
        }
        for (const [k, v] of ownMetadata) {
            const returnGenericsProperty = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.BEAN_RETURN_GENERICS, target.prototype, k);
            if (!returnGenericsProperty) {
                throw new Error(`rest class(${target.name}) function(${k}) not found @ReturnGenericsProperty`);
            }
            let returnType;
            for (const [gk, gv] of returnGenericsProperty) {
                if (!returnType) {
                    returnType = gk;
                }
                else {
                    if (gk.length < returnType.length) {
                        returnType = gk;
                    }
                }
            }
            let url = "";
            if (options.name) {
                if (options.name[0] !== "/") {
                    url += "/" + options.name;
                }
                else {
                    url += options.name;
                }
            }
            if (v.path) {
                if (v.path[0] !== "/") {
                    url += "/" + v.path;
                }
                else {
                    url += v.path;
                }
            }
            target.prototype[k] = async function () {
                const i = Math.floor((Math.random() * writeDataSources.length));
                const dataSource = writeDataSources[i];
                const connection = await dataSource.getConnection();
                return await connection.request(returnGenericsProperty[returnType], returnGenericsProperty, url, v.method, 0, v.frequency);
            };
        }
    }
}
//# sourceMappingURL=RestRemote.js.map