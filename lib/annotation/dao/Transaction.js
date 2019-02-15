"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MetaConstant_1 = require("../../constants/MetaConstant");
/**
 *
 * 功能描述: 开启事务
 *
 * @className Transaction
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/27 10:47
 */
require("reflect-metadata");
const GenerateUtil_1 = require("../../util/GenerateUtil");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
const ApplicationLog_1 = require("../../log/ApplicationLog");
function Transaction(target, propertyKey, descriptor) {
    let options = { level: "READ UNCOMMITTED" };
    if (propertyKey) {
        if (propertyKey) {
            exec(target, propertyKey, descriptor, options);
        }
    }
    else {
        return (target1, propertyKey1, descriptor1) => {
            if (typeof target === "string") {
                options.level = target;
            }
            else {
                options = target;
            }
            exec(target1, propertyKey1, descriptor1, options);
        };
    }
}
exports.Transaction = Transaction;
function exec(target, propertyKey, descriptor, option) {
    const method = descriptor.value;
    descriptor.value = async function () {
        try {
            if (JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(this[MetaConstant_1.MetaConstant.TRANSACTION_OBJECT])) {
                this[MetaConstant_1.MetaConstant.TRANSACTION_OBJECT] = new Map();
            }
            const map = this[MetaConstant_1.MetaConstant.TRANSACTION_OBJECT];
            map.set(propertyKey, { id: GenerateUtil_1.GenerateUtil.uuid(10, 20), commits: [], rollbacks: [], releases: [] });
            await method.apply(this, arguments);
            // 执行提交函数
            if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).commits)) {
                for (const func of map.get(propertyKey).commits) {
                    await func();
                }
            }
        }
        catch (e) {
            try {
                // 执行回退函数
                const map = this[MetaConstant_1.MetaConstant.TRANSACTION_OBJECT];
                if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).rollbacks)) {
                    for (const func of map.get(propertyKey).rollbacks) {
                        await func();
                    }
                }
            }
            catch (e) {
                ApplicationLog_1.ApplicationLog.error("transaction rollback error", e);
            }
            throw e;
        }
        finally {
            // 执行释放连接
            const map = this[MetaConstant_1.MetaConstant.TRANSACTION_OBJECT];
            if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).releases)) {
                map.get(propertyKey).releases.forEach((func) => {
                    func();
                });
                map.delete(propertyKey);
            }
        }
    };
    Reflect.defineMetadata(MetaConstant_1.MetaConstant.TRANSACTION, option, target, propertyKey);
}
//# sourceMappingURL=Transaction.js.map