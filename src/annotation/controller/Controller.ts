/**
 *
 * 功能描述: 定义controller
 *
 * @className Control5ler
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:19
 */
import "reflect-metadata";
import {Controllers} from "../../core/Controllers";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";
import {MetaConstant} from "../../constants/MetaConstant";
import {JSHelperUtil} from "../../util/JSHelperUtil";
export function Controller(option: ControllerOptions): CallableFunction {
    return <T extends {new(...args: any[]): {}}>(target: T | object, propertyKey?: string, descriptor?: PropertyDescriptor): any => {
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
