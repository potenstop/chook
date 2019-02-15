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
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant.REQUEST_MAPPING, target) || new Map<string, object>();
        let newTarget;
        if (target instanceof Function) {
            newTarget = target;
        } else {
            newTarget = target.constructor as (new () => object);
        }
        for (const [k, v] of dataValueMap) {
            Controllers.addController(newTarget, k, v.path, v.method, v.frequency);
        }
        if (target instanceof Function) {
            Controllers.setHeader(newTarget, null, option.requestContentType, option.responseContentType);
        } else {
            Controllers.setHeader(newTarget, propertyKey, option.requestContentType, option.responseContentType);
        }
    };
}

export class ControllerOptions {
    public requestContentType: ContentTypeEnum;
    public responseContentType: ContentTypeEnum;
}
