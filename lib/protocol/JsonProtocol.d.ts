/**
 *
 * 功能描述: Json 转换协议 识别JsonProperty装饰器
 *
 * @className JsonProtocol
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/30 17:48
 */
import "reflect-metadata";
export declare class JsonProtocol {
    /**
     * 方法描述: bean 数组转json对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param beans 数组
     * @param beanGenericsMap
     * @param parentKey
     * @return JSON
     */
    static toArray(beans: object[], beanGenericsMap: Map<string, new () => object>, parentKey: string): object[];
    /**
     * 方法描述: bean 对象转json对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param bean 对象
     * @param beanGenericsMap   泛型字典
     * @param parentKey
     * @return JSON
     */
    static toJson(bean: object, beanGenericsMap?: Map<string, new () => object>, parentKey?: string): object;
    /**
     * 方法描述: bean 对象转json字符串
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param bean 对象
     * @param beanGenericsMap   bean对象泛型字典
     * @param parentKey         父级key
     * @return JSON
     */
    static toJSONString(bean: object, beanGenericsMap?: Map<string, new () => object>, parentKey?: string): string;
    /**
     * 方法描述: JSON数组转bean集合
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param array  源jsonArray对象
     * @param Bean  目标bean对象
     * @param beanGenericsMap
     * @param parentKey
     * @return Bean[]
     */
    static arrayToBeans<T>(array: object[], Bean: any, beanGenericsMap: Map<string, new () => object>, parentKey: string): T[] | Set<T>;
    /**
     * 方法描述: JSON对象转bean对象
     * @author  yanshaowen
     * @date 2018/12/30 17:50
     * @param json  源json对象
     * @param Bean  目标bean对象
     * @param beanGenericsMap
     * @param parentKey
     * @return Bean
     */
    static jsonToBean<T>(json: object, Bean: new () => T, beanGenericsMap: Map<string, new () => object>, parentKey?: string): T;
    /**
     * 方法功能描述: 根据返回值转换成bean对象
     * @author yanshaowen
     * @date 2019/2/19 10:18
     * @param value             转换的值
     * @param genericsProperty
     * @return
     */
    static routerToBean(value: any, genericsProperty: Map<string, new () => object>): any;
}
