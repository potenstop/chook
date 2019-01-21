/**
 *
 * 功能描述:
 *
 * @className RestController
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/22 14:31
 */
import {Controller, ControllerOptions} from "./Controller";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";
import {Component} from "../component/Component";
import "reflect-metadata";

export function RestController(target: (new () => object)): void;
export function RestController(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
export function RestController(target: (new () => object) | object, propertyKey?: string, descriptor?: PropertyDescriptor): any {
    const controllerOptions = new ControllerOptions();
    controllerOptions.requestContentType = ContentTypeEnum.APPLICATION_JSON;
    controllerOptions.responseContentType = ContentTypeEnum.APPLICATION_JSON;
    if (target instanceof Function) {
        Controller(controllerOptions)(target);
        return Component(target);
    } else {
        // 方法装饰器
        Controller(controllerOptions)(target, propertyKey, descriptor);
    }
}
