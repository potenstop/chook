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
declare type level = "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE";
interface IOptions {
    level: level;
}
export declare function Transaction(target: object, propertyKey: string, descriptor: PropertyDescriptor): void;
export declare function Transaction(target: level): MethodDecorator;
export declare function Transaction(target: IOptions): MethodDecorator;
export {};
