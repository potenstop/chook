import {MetaConstant} from "../../constants/MetaConstant";

/**
 *
 * 功能描述:
 *
 * @className Autowired
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/21 22:19
 */
import "reflect-metadata";
export function Autowired(target: object, propertyKey: string): void;
export function Autowired(target: any): CallableFunction;
export function Autowired(target: object, propertyKey?: string): void | CallableFunction {
    if (!propertyKey) {
        return (target1: object, propertyKey1: string) => {
            const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, target1) || new Set<string>();
            keys.add(propertyKey1);
            Reflect.defineMetadata(MetaConstant.AUTOWIRED, keys, target1);
            Reflect.defineMetadata(MetaConstant.DESIGN_TYPE, target, target1, propertyKey1);
        };
    } else {
        const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, target) || new Set<string>();
        keys.add(propertyKey);
        Reflect.defineMetadata(MetaConstant.AUTOWIRED, keys, target);
    }

}
