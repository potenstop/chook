import "reflect-metadata"
import {RequestRedisCommand} from "../../enums/RequestRedisCommand";
import {MetaConstant} from "../../constants/MetaConstant";

/**
 *
 * 功能描述:
 *
 * @className RequestRedis
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/18 12:50
 */
export function RequestRedisMapping(target: IOptions): CallableFunction;
export function RequestRedisMapping(target: string): CallableFunction;
export function RequestRedisMapping(target: string | IOptions): CallableFunction {
    let options: any = {};
    if (typeof target === "string") {
        options.path = target;
    } else {
        options = target;
    }
    if (!options.command) {
        options.command = RequestRedisCommand.GET;
    }
    return (target1: (new () => object), propertyKey: string) => {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant.REQUEST_REDIS_MAPPING, target1) || new Map<string, IOptions>();
        dataValueMap.set(propertyKey, options);
        Reflect.defineMetadata(MetaConstant.REQUEST_REDIS_MAPPING, dataValueMap, target1);
    };
}

interface IOptions {
    // 路由 /
    path: string;
    // 方法 所有方法
    command?: RequestRedisCommand;
}
