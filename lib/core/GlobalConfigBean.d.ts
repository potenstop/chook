/**
 *
 * 功能描述: 全局配置接口
 *
 * @className GlobalBean
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/26 11:31
 */
import { Middleware } from "koa";
import { IApplication } from "../app/IApplication";
import { KoaApplication } from "../app/KoaApplication";
export interface IGlobalConfigBean {
    application: IApplication;
    middleware: any[];
}
export declare class DefaultGlobalConfigBean implements IGlobalConfigBean {
    application: KoaApplication;
    middleware: Middleware[];
}
