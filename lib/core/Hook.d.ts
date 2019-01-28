/**
 *
 * 功能描述: 钩子记录执行链路
 *
 * @className Hook
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/10 12:52
 */
import { HttpContent } from "../context/HttpContent";
export declare class HookLog {
    private static hookLinkHead;
    static add(triggerAsyncId: number, hookLink: HookLink): boolean;
    static destroy(asyncId: number): boolean;
    private static iterationAsyncId;
    private static iterationParent;
    static findByAsyncId(asyncId: number): HookLink;
    static findParent(asyncId: number, type: string): HookLink;
    static getHead(): HookLink;
    static setHttpContext(httpContext: HttpContent): boolean;
    static setDate(hookLink: HookLink, key: string, value: any): boolean;
}
export declare class HookLink {
    pre: HookLink;
    next: Map<number, HookLink>;
    type: string;
    createTime: Date;
    destroyTime: Date;
    asyncId: number;
    data: Map<string, any>;
}
