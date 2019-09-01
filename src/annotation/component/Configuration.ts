import {Core} from "./Core";

/**
 *
 * 功能描述:
 *
 * @className Configuration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 9:47
 */
export function Configuration<T extends new(...args: any[]) => {}>(target: T): void {
    return Core.proxy(target, "Configuration");
}
