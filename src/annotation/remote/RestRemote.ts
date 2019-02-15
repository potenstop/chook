/**
 *
 * 功能描述:
 *
 * @className RestRemote
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 12:54
 */
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {RestConnection} from "../../data/rest/RestConnection";
import {FileUtil} from "../../util/FileUtil";
import {Mappers} from "../../core/Mappers";
import * as path from "path";
import {Beans} from "../../core/Beans";
import {TypeDataSource} from "../../data/typeorm/TypeDataSource";
export function RestRemote(target: string): CallableFunction;
export function RestRemote(target: Options): CallableFunction;
export function RestRemote(target: Options | string): CallableFunction {
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
    const ownMetadata = Reflect.getOwnMetadata(MetaConstant.REQUEST_MAPPING, target) || new Map<string, object>();
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
                    if (bean instanceof TypeDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {readDataSources.push(bean); } else {writeDataSources.push(bean); }
                }
            }
        });
        if (writeDataSources.length === 0) {
            throw new Error("RestRemote write dataSource is empty");
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
                if (options.name[0] !== "/") {
                    url += "/" + options.name;
                } else {
                    url += options.name;
                }
            }
            if (v.path) {
                if (v.path[0] !== "/") {
                    url += "/" + v.path;
                } else {
                    url += v.path;
                }
            }
            target.prototype[k] = async function() {
                const i = Math.floor((Math.random() * writeDataSources.length));
                const dataSource = writeDataSources[i];
                const connection = await dataSource.getConnection() as RestConnection;
                return await connection.request(returnGenericsProperty[returnType], returnGenericsProperty,  url, v.method, 0, v.frequency);
            };
        }
    }
}
