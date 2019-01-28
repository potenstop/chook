"use strict";
/**
 *
 * 功能描述: 钩子记录执行链路
 *
 * @className Hook
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/10 12:52
 */
Object.defineProperty(exports, "__esModule", { value: true });
const JSHelperUtil_1 = require("../util/JSHelperUtil");
const async_hooks_1 = require("async_hooks");
// let indent = 0;
async_hooks_1.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
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
class HookLog {
    static add(triggerAsyncId, hookLink) {
        if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(HookLog.hookLinkHead)) {
            const head = new HookLink();
            head.asyncId = triggerAsyncId;
            head.type = "ROOT";
            head.createTime = new Date();
            head.next = new Map();
            head.next.set(hookLink.asyncId, hookLink);
            HookLog.hookLinkHead = head;
            return true;
        }
        else {
            const triggerHookLink = HookLog.iterationAsyncId(triggerAsyncId, HookLog.hookLinkHead);
            if (triggerHookLink) {
                if (!triggerHookLink.next) {
                    triggerHookLink.next = new Map();
                }
                triggerHookLink.next.set(hookLink.asyncId, hookLink);
                hookLink.pre = triggerHookLink;
                return true;
            }
            return false;
        }
    }
    static destroy(asyncId) {
        const triggerHookLink = HookLog.iterationAsyncId(asyncId, HookLog.hookLinkHead);
        if (triggerHookLink) {
            triggerHookLink.destroyTime = new Date();
            return true;
        }
        return false;
    }
    static iterationAsyncId(triggerAsyncId, currentHook) {
        if (currentHook) {
            if (currentHook.asyncId === triggerAsyncId) {
                return currentHook;
            }
            else if (currentHook.next) {
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
    static iterationParent(type, currentHookLink) {
        if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(currentHookLink)) {
            return null;
        }
        if (currentHookLink.type === type) {
            return currentHookLink;
        }
        else {
            return HookLog.iterationParent(type, currentHookLink.pre);
        }
    }
    static findByAsyncId(asyncId) {
        return HookLog.iterationAsyncId(asyncId, HookLog.getHead());
    }
    static findParent(asyncId, type) {
        // 定义到async的HookLink
        const hookLink = HookLog.findByAsyncId(asyncId);
        if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(hookLink)) {
            return null;
        }
        return HookLog.iterationParent(type, hookLink);
    }
    static getHead() {
        return HookLog.hookLinkHead;
    }
    static setHttpContext(httpContext) {
        const hookLink = HookLog.findParent(async_hooks_1.executionAsyncId(), "HTTPPARSER");
        return HookLog.setDate(hookLink, "httpContext", httpContext);
    }
    static setDate(hookLink, key, value) {
        if (hookLink) {
            if (!hookLink.data) {
                hookLink.data = new Map();
            }
            hookLink.data.set(key, value);
        }
        return false;
    }
}
exports.HookLog = HookLog;
class HookLink {
}
exports.HookLink = HookLink;
//# sourceMappingURL=Hook.js.map