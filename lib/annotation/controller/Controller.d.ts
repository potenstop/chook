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
import { ContentTypeEnum } from "../../enums/ContentTypeEnum";
export declare function Controller(option: ControllerOptions): CallableFunction;
export declare class ControllerOptions {
    requestContentType: ContentTypeEnum;
    responseContentType: ContentTypeEnum;
}
