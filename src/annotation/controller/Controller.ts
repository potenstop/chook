/**
 *
 * 功能描述: 定义controller
 *
 * @className Control5ler
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 14:19
 */
import {Controllers} from "../../core/Controllers";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";

export function Controller(option: ControllerOptions): CallableFunction {
    return (target: (new () => object) | object, propertyKey?: string, descriptor?: PropertyDescriptor) => {
        if (target instanceof Function) {
            Controllers.setHeader(target, null, option.requestContentType, option.responseContentType);
        } else {
            Controllers.setHeader(target.constructor as (new () => object), propertyKey, option.requestContentType, option.responseContentType);
        }
    };
}

export class ControllerOptions {
    public requestContentType: ContentTypeEnum;
    public responseContentType: ContentTypeEnum;
}
