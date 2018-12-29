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
import {Controller} from "./Controller";

export function RestController(target: (new () => object)): void;
export function RestController(target: (new () => object), propertyKey: string): void;
export function RestController(target: (new () => object), propertyKey?: string): void {
    Controller(target, propertyKey);
    ResponseBody(target, propertyKey);
}
