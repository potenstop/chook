/**
 *
 * 功能描述: 所有注册的bean对象
 *
 * @className Beans
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/25 9:46
 */
export class Beans {

    public static setBean(name: string, value: object): void {
        Beans.beans.set(name, value);
    }
    public static getBean(name: string): object {
        return Beans.beans.get(name);
    }
    private static beans: Map<string, object> = new Map<string, object>();
}
