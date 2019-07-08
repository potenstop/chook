import "reflect-metadata";
import * as path from "path";
import { RedisDataSource } from "../../data/redis/RedisDataSource";
import { RedisConnection } from "../../data/redis/RedisConnection";
import { Mappers, MetaConstant, FileUtil, Beans} from "papio-common";

/**
 *
 * 功能描述:
 *
 * @className RedisRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/18 10:38
 */
export function RedisRemote(target: string): CallableFunction;
export function RedisRemote(target: Options): CallableFunction;
export function RedisRemote(target: Options | string): CallableFunction {
    // 检查有没有安装ioredis
    try {
        require("ioredis");
    } catch (e) {
        throw new Error(`If you want to use it, you must install ioredis to you project`);
    }
    let options = new Options();
    return (target1: (new () => object)) => {
        if (typeof target !== "string") {
            options = target;
        } else {
            options.filepath = target;
        }
        exec(target1, options);
    };
}
class Options {
    public name?: string;
    public filepath: string;
}
function exec(target: (new () => object), options: Options) {
    const ownMetadata = Reflect.getOwnMetadata(MetaConstant.REQUEST_REDIS_MAPPING, target.prototype) || new Map<string, object>();
    const strings = FileUtil.findParents(options.filepath);
    let mapperTarget = null;
    for (const str of strings) {
        mapperTarget = Mappers.getMapper(path.join(str));
        if (mapperTarget) {
            break;
        }
    }
    if (mapperTarget) {
        const beanKeys = Reflect.getOwnMetadata(MetaConstant.BEANS, mapperTarget.prototype) || new Set<string>();
        const readDataSources = [];
        const writeDataSources = [];
        beanKeys.forEach((key) => {
            const bean = Beans.getBean(key) as any;
            if (bean.kind) {
                if (bean.kind.split(" ").indexOf("IDataSource") !== -1) {
                    let isReadOnly = false;
                    if (bean instanceof RedisDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {readDataSources.push(bean); } else {writeDataSources.push(bean); }
                }
            }
        });
        if (writeDataSources.length === 0) {
            throw new Error("RedisRemote write dataSource is empty");
        }
        for (const [k, v] of ownMetadata) {
            const returnGenericsProperty = Reflect.getOwnMetadata(MetaConstant.BEAN_RETURN_GENERICS,  target.prototype, k);
            if (!returnGenericsProperty) {
                throw new Error(`rest class(${target.name}) function(${k}) not found @ReturnGenericsProperty`);
            }
            let returnType;
            for (const [gk, gv] of returnGenericsProperty) {
                if (!returnType) {
                    returnType = gk;
                } else {
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

            target.prototype[k] = async function() {
                const i = Math.floor((Math.random() * writeDataSources.length));
                const dataSource: RedisDataSource = writeDataSources[i];
                const connection = await dataSource.getConnection() as RedisConnection;
                const commands = Object.keys(arguments).map((key) => arguments[key]);
                commands.unshift(url);
                return connection.execCommandSerialize(v.command, commands, returnGenericsProperty);

            };
        }
    } else {
        throw new Error(`RedisRemote: not found filepath(${options.filepath}) for dataSource`);
    }
}
