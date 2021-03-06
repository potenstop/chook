import {Core} from "./Core";
/**
 *
 * 功能描述: 标识为组件 Autowired会生效
 *
 * @className Component
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/14 11:49
 */
export function Component<T extends new(...args: any[]) => {}>(target: T): void {
    return Core.proxy(target, "Component");
}
