import {MetaConstant} from "papio-common";
import "reflect-metadata";

/**
 *
 * 功能描述: 主库连接标识
 *
 * @className Primary
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/27 10:44
 */
export function Primary(target: object, propertyKey: string): void {
    Reflect.defineMetadata(MetaConstant.PRIMARY, true, target, propertyKey);
}
