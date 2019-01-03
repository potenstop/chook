/**
 *
 * 功能描述: json的名称
 *
 * @className JsonProperty
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/30 17:29
 */
import {MetaConstant} from "../../constants/MetaConstant";
import {Property} from "./Property";

export function JsonProperty(value: string): CallableFunction {
    return (target: (new () => object), propertyKey: string) => {
        Property(target, propertyKey);
        Reflect.defineMetadata(MetaConstant.JSON_PROPERTY, value, target, propertyKey);
    };

}
export namespace annotation {
    export const JsonProperty1 = JsonProperty;
}
