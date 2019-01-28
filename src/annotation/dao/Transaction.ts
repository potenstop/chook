import {MetaConstant} from "../../constants/MetaConstant";

/**
 *
 * 功能描述: 开启事务
 *
 * @className Transaction
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/27 10:47
 */
import "reflect-metadata";
import {GenerateUtil} from "../../util/GenerateUtil";
import {ITransactionObject} from "../../model/ITransactionObject";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {ApplicationLog} from "../../log/ApplicationLog";
type level = "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";
interface IOptions {
    level: level;
}
// @Transaction
export function Transaction(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
// @Transaction("mysql-master")
export function Transaction(target: level): MethodDecorator;
// @Transaction({connectionName："mysql-master", level: "READ UNCOMMITTED"})
export function Transaction(target: IOptions): MethodDecorator;
export function Transaction(target: IOptions | object | level, propertyKey?: string, descriptor?: PropertyDescriptor): MethodDecorator | void {
    let options = {level: "READ UNCOMMITTED"} as IOptions;
    if (propertyKey) {
        if (propertyKey) {
            exec(target as object, propertyKey, descriptor,  options);
        }
    } else {
        return (target1: object, propertyKey1: string, descriptor1: PropertyDescriptor) => {
            if (typeof target === "string") {
                options.level = target;
            } else {
                options = target as IOptions;
            }
            exec(target1, propertyKey1, descriptor1,  options);
        };
    }
}
function exec(target: object, propertyKey: string, descriptor: PropertyDescriptor, option: IOptions) {
    const method = descriptor.value;
    descriptor.value = async function() {
        try {
            if (JSHelperUtil.isNullOrUndefined(this[MetaConstant.TRANSACTION_OBJECT])) {
                this[MetaConstant.TRANSACTION_OBJECT] = new Map<string, ITransactionObject>();
            }
            const map = this[MetaConstant.TRANSACTION_OBJECT] as Map<string, ITransactionObject>;
            map.set(propertyKey, {id: GenerateUtil.uuid(10, 20), commits: [], rollbacks: [], releases: []});
            await method.apply(this, arguments);
            // 执行提交函数
            if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).commits)) {
                for (const func of map.get(propertyKey).commits) {
                    await func();
                }
            }
        } catch (e) {
            try {
                // 执行回退函数
                const map = this[MetaConstant.TRANSACTION_OBJECT] as Map<string, ITransactionObject>;
                if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).rollbacks)) {
                    for (const func of map.get(propertyKey).rollbacks) {
                        await func();
                    }
                }
            } catch (e) {
                ApplicationLog.error("transaction rollback error", e);
            }
        } finally {
            // 执行释放连接
            const map = this[MetaConstant.TRANSACTION_OBJECT] as Map<string, ITransactionObject>;
            if (map.has(propertyKey) && Array.isArray(map.get(propertyKey).releases)) {
                map.get(propertyKey).releases.forEach((func) => {
                    func();
                });
                map.delete(propertyKey);
            }
        }
    };
    Reflect.defineMetadata(MetaConstant.TRANSACTION, option, target, propertyKey);
}
