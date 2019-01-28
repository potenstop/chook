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
export function Autowired(target: object, propertyKey: string): void {
    const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, target) || new Set<string>();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant.AUTOWIRED, keys, target);
}
