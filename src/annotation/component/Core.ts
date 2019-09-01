import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {Beans} from "../../core/Beans";
import {PapioEmitterDefault} from "../../core/PapioEmitterDefault";
import {EmitterEnum} from "../../enums/EmitterEnum";

/**
 *
 * 功能描述:
 *
 * @className core
 * @projectName papio
 * @author yanshaowen
 * @date 2019/8/31 10:48
 */
const serviceSet = new Set<Object>();
const configurationSet = new Set<Object>();
const componentSet = new Set<Object>();
const allSet = new Set<Object>();

const serviceMap = new Map<Object, object>();
const configurationMap = new Map<Object, object>();
const componentMap = new Map<Object, object>();
const allMap = new Map<Object, object>();
export class Core {
    public static getMapByKey(typeName: any): object {
        let o = null;
        allMap.forEach((v: object, k: Object) => {
            if (typeName.isPrototypeOf(k)) {
                o = v;
            }
        });
        if (o === null) {
            o = new typeName();
        }
        if (o == null) {
            process.stdout.write("not found object name =" + typeName.constructor.name);
            process.exit(100);
        }
        return o;
    }
    public static singleton(target: new () => object, name: string): void {
        const o = new target();
        if (name === "service") {
            serviceMap.set(target, o);
        } else if (name === "configuration") {
            configurationMap.set(target, o);
        } else if (name === "component") {
            componentMap.set(target, o);
        }
        allMap.set(target, o);
        // setTimeout(() => {
            const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, target.prototype) || new Set<string>();
            keys.forEach((key) => {
                const typeName = Reflect.getOwnMetadata(MetaConstant.DESIGN_TYPE, target.prototype, key);
                if (JSHelperUtil.isNotNull(typeName) && JSHelperUtil.isClassObject(typeName)) {
                    // const typeValue = Core.getMapByKey(typeName);
                    const typeValue = {}
                    // 注入触发的trigger
                    typeValue[MetaConstant.TRIGGER] = o;
                    o[key] = typeValue;
                    console.log(o, key)
                }
            });
            // 注入resource
            const resourceKeys: Map<string, string> = Reflect.getOwnMetadata(MetaConstant.RESOURCE, target.prototype) || new Map<string, string>();
            resourceKeys.forEach((value, key) => {
                o[key] = Beans.getBean(value);
            });
        //}, 50);
    }
    public static proxy<T extends new(...args: any[]) => {}>(target: T, name: string): any {
        if (name === "service") {
            serviceSet.add(target);
        } else if (name === "configuration") {
            configurationSet.add(target);
        } else if (name === "component") {
            componentSet.add(target);
        }
        const proxy =  new Proxy(target, {
            construct<T1 extends new(...args: any[]) => {}>(constructor: T1, args: IArguments) {
                const o = new constructor(...args);
                // 注入Autowired
                const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, constructor.prototype) || new Set<string>();
                keys.forEach((key) => {
                    let typeName = Reflect.getOwnMetadata(MetaConstant.DESIGN_TYPE, constructor.prototype, key);
                    if (JSHelperUtil.isNotNull(typeName) && JSHelperUtil.isClassObject(typeName)) {
                        allMap.forEach((value, k) => {
                            console.log(k, '11111111', value)
                            if (typeName.isPrototypeOf(value)) {
                                typeName = value;
                                console.log('1111111')
                            }
                        });
                        const targetObject = Reflect.construct(typeName, []);
                        console.log(targetObject, 222222222);
                        console.log(typeName, targetObject);
                        // 注入触发的trigger
                        targetObject[MetaConstant.TRIGGER] = o;
                        o[key] = targetObject;
                        console.log(key, o[key], '==================');
                    }
                });
                // 注入resource
                const resourceKeys: Map<string, string> = Reflect.getOwnMetadata(MetaConstant.RESOURCE, constructor.prototype) || new Map<string, string>();
                resourceKeys.forEach((value, key) => {
                    o[key] = Beans.getBean(value);
                });
                return o;
            },
        });
        console.log(proxy)
        allMap.set(target, proxy);
        return proxy;
    }
}
