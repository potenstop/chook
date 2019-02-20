"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const FileUtil_1 = require("../../util/FileUtil");
const Mappers_1 = require("../../core/Mappers");
const path = require("path");
const Beans_1 = require("../../core/Beans");
const RedisDataSource_1 = require("../../data/redis/RedisDataSource");
function RedisRemote(target) {
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
exports.RedisRemote = RedisRemote;
class Options {
}
function exec(target, options) {
    const ownMetadata = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.REQUEST_REDIS_MAPPING, target.prototype) || new Map();
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
                    if (bean instanceof RedisDataSource_1.RedisDataSource) {
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
            throw new Error("RedisRemote write dataSource is empty");
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
                url += options.name;
            }
            if (v.path) {
                url += v.path;
            }
            target.prototype[k] = async function () {
                const i = Math.floor((Math.random() * writeDataSources.length));
                const dataSource = writeDataSources[i];
                const connection = await dataSource.getConnection();
                const commands = Object.keys(arguments).map((key) => arguments[key]);
                commands.unshift(url);
                return connection.execCommandSerialize(v.command, commands, returnGenericsProperty);
            };
        }
    }
    else {
        throw new Error(`RedisRemote: not found filepath(${options.filepath}) for dataSource`);
    }
}
//# sourceMappingURL=RedisRemote.js.map