/**
 *
 * 功能描述:
 *
 * @className RestController
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 14:31
 */
import {ResponseBody} from "../response/ResponseBody";
import {Controller, ControllerOptions} from "./Controller";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";

export function RestController(target: (new () => object)): void;
export function RestController(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
export function RestController(target: (new () => object) | object, propertyKey?: string, descriptor?: PropertyDescriptor): void {
    const controllerOptions = new ControllerOptions();
    controllerOptions.requestContentType = ContentTypeEnum.APPLICATION_JSON;
    controllerOptions.responseContentType = ContentTypeEnum.APPLICATION_JSON;
    if (target instanceof Function) {
        // 类装饰器
        Controller(controllerOptions)(target);
    } else {
        // 方法装饰器
        Controller(controllerOptions)(target, propertyKey, descriptor);
    }
}
