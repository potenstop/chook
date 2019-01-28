/**
 *
 * 功能描述: 钩子记录执行链路
 *
 * @className Hook
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/10 12:52
 */

import {JSHelperUtil} from "../util/JSHelperUtil";
import {AsyncResource, createHook, executionAsyncId} from "async_hooks";
import * as fs from "fs";
import {HttpContent} from "../context/HttpContent";

// let indent = 0;
createHook({
    init(asyncId: number, type: string, triggerAsyncId: number, resource: AsyncResource) {
        const hookLink = new HookLink();
        hookLink.createTime = new Date();
        hookLink.asyncId = asyncId;
        hookLink.type = type;
        HookLog.add(triggerAsyncId, hookLink);
        // const eid = executionAsyncId();
        // const indentStr = " ".repeat(indent);
        // fs.writeSync(1, `${type}(${asyncId}):` + ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
    before(asyncId) {
        /*const indentStr = " ".repeat(indent);
        fs.writeSync(1, `${indentStr}before:  ${asyncId}\n`);
        indent += 2;*/
    },
    after(asyncId) {
        /*indent -= 2;
        const indentStr = " ".repeat(indent);
        fs.writeSync(1, `${indentStr}after:   ${asyncId}\n`);*/
    },
    destroy(asyncId) {
        HookLog.destroy(asyncId);
    },
    promiseResolve(asyncId) {
        // fs.writeSync(1, `promiseResolve ${asyncId}\n`);
    },
}).enable();
export class HookLog {
    private static hookLinkHead: HookLink;
    public static add(triggerAsyncId: number, hookLink: HookLink): boolean {
        if (JSHelperUtil.isNullOrUndefined(HookLog.hookLinkHead)) {
            const head = new HookLink();
            head.asyncId = triggerAsyncId;
            head.type = "ROOT";
            head.createTime = new Date();
            head.next = new Map<number, HookLink>();
            head.next.set(hookLink.asyncId, hookLink);
            HookLog.hookLinkHead = head;
            return true;
        } else {
            const triggerHookLink = HookLog.iterationAsyncId(triggerAsyncId, HookLog.hookLinkHead);
            if (triggerHookLink) {
                if (!triggerHookLink.next) {
                    triggerHookLink.next = new Map<number, HookLink>();
                }
                triggerHookLink.next.set(hookLink.asyncId, hookLink);
                hookLink.pre = triggerHookLink;
                return true;
            }
            return false;
        }
    }
    public static destroy(asyncId: number): boolean {
        const triggerHookLink = HookLog.iterationAsyncId(asyncId, HookLog.hookLinkHead);
        if (triggerHookLink) {
            triggerHookLink.destroyTime = new Date();
            return true;
        }
        return false;
    }

    private static iterationAsyncId(triggerAsyncId: number, currentHook: HookLink): HookLink {
        if (currentHook) {
            if (currentHook.asyncId === triggerAsyncId) {
                return currentHook;
            } else if (currentHook.next) {
                for (const [asyncId, hookLink] of currentHook.next) {
                    const re = HookLog.iterationAsyncId(triggerAsyncId, hookLink);
                    if (re) {
                        return re;
                    }
                }
            }
        }
        return null;
    }
    private static iterationParent(type: string, currentHookLink: HookLink) {
        if (JSHelperUtil.isNullOrUndefined(currentHookLink)) {
            return null;
        }
        if (currentHookLink.type === type) {
            return currentHookLink;
        } else {
            return HookLog.iterationParent(type, currentHookLink.pre);
        }
    }
    public static findByAsyncId(asyncId: number) {
        return HookLog.iterationAsyncId(asyncId, HookLog.getHead());
    }
    public static findParent(asyncId: number, type: string): HookLink {
        // 定义到async的HookLink
        const hookLink = HookLog.findByAsyncId(asyncId);
        if (JSHelperUtil.isNullOrUndefined(hookLink)) {
            return null;
        }
        return HookLog.iterationParent(type, hookLink);
    }
    public static getHead() {
        return HookLog.hookLinkHead;
    }

    public static setHttpContext(httpContext: HttpContent): boolean {
        const hookLink = HookLog.findParent(executionAsyncId(), "HTTPPARSER");
        return HookLog.setDate(hookLink, "httpContext", httpContext);
    }
    public static setDate(hookLink: HookLink, key: string, value: any): boolean {
        if (hookLink) {
            if (!hookLink.data) {
                hookLink.data = new Map<string, any>();
            }
            hookLink.data.set(key, value);
        }
        return false;
    }
}

export class HookLink {
    public pre: HookLink;
    public next: Map<number, HookLink>;
    public type: string;
    public createTime: Date;
    public destroyTime: Date;
    public asyncId: number;
    public data: Map<string, any>;
}
