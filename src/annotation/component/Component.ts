import {MetaConstant} from "../../constants/MetaConstant";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import "reflect-metadata";
/**
 *
 * 功能描述: 标识为组件 Autowired会生效
 *
 * @className Component
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/14 11:49
 */
export function Component<T extends {new(...args: any[]): {}}>(target: T): any {
    return new Proxy(target, {
        construct<T1 extends {new(...args: any[]): {}}>(constructor: T1, args: IArguments) {
            const o = new constructor(...args);
            // 注入Autowired
            const keys: Set<string> = Reflect.getOwnMetadata(MetaConstant.AUTOWIRED, constructor.prototype) || new Set<string>();
            keys.forEach((key) => {
                const typeName = Reflect.getOwnMetadata(MetaConstant.DESIGN_TYPE, constructor.prototype, key);
                if (JSHelperUtil.isNotNull(typeName) && JSHelperUtil.isClassObject(typeName)) {
                    o[key] = Reflect.construct(typeName, []);
                }
            });
            return o;
        },
    });
}
