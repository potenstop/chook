/**
 *
 * 功能描述: 所有注册的bean对象
 *
 * @className Beans
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/25 9:46
 */
export declare class Beans {
    static setBean(name: string, value: object): void;
    static getBean(name: string): object;
    static getBeans(): Map<string, object>;
    private static beans;
}
