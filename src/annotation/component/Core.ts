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
const allTargetProxyMap = new Map<Object, object>();
export class Core {
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
                // 已经存在的instance key=class value=class对应的实例
                let existInstance = new Map<Object, object>();
                if (args[0] && args[0] instanceof Map) {
                    existInstance = args[0];
                }
                if (existInstance.has(constructor)) {
                    return existInstance.get(constructor);
                }
                // existInstance.set(constructor, {});
                const o = Reflect.construct(constructor, args);
                existInstance.set(constructor, o);
                // 注入Autowired
                const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, constructor.prototype) || new Set<string>();
                keys.forEach((key) => {
                    // 注入的类型class
                    let injectClazz = Reflect.getOwnMetadata(MetaConstant.DESIGN_TYPE, constructor.prototype, key);
                    if (JSHelperUtil.isNotNull(injectClazz) && JSHelperUtil.isClassObject(injectClazz)) {
                        // 可实例化的class 默认为注入的class
                        let instantiationClazz = injectClazz;
                        // 判断注入的类型是否为抽象类 并且有实现类 如果有则覆盖 注入的class
                        allTargetProxyMap.forEach((proxyClazz, clazz) => {
                            if (injectClazz.isPrototypeOf(proxyClazz)) {
                                injectClazz = proxyClazz;
                                instantiationClazz = clazz;
                            }
                        });
                        let targetObject = null;
                        if (existInstance.has(instantiationClazz)) {
                            targetObject = existInstance.get(instantiationClazz);
                        } else {
                            targetObject = Reflect.construct(injectClazz, [existInstance]);
                            existInstance.set(instantiationClazz, targetObject);
                        }
                        // 注入触发的trigger
                        targetObject[MetaConstant.TRIGGER] = o;
                        o[key] = targetObject;
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
        allTargetProxyMap.set(target, proxy);
        return proxy;
    }
}
