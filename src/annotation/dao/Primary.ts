import {MetaConstant} from "../../constants/MetaConstant";
import "reflect-metadata";

/**
 *
 * 功能描述: 主库连接标识
 *
 * @className Primary
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/27 10:44
 */
export function Primary(target: object, propertyKey: string): void {
    Reflect.defineMetadata(MetaConstant.PRIMARY, true, target, propertyKey);
}
