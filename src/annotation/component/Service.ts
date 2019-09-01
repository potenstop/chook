/**
 *
 * 功能描述:
 *
 * @className Service
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 14:19
 */
import {Core} from "./Core";
export function Service<T extends new(...args: any[]) => {}>(target: T): void {
    return Core.proxy(target, "Service");
}
