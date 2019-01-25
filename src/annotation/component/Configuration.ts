import {Component} from "./Component";

/**
 *
 * 功能描述:
 *
 * @className Configuration
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/22 9:47
 */
export function Configuration<T extends {new(...args: any[]): {}}>(target: T): any {
    return Component(target);
}
