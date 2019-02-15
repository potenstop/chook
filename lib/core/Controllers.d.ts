/**
 *
 * 功能描述: 所有的controller
 *
 * @className Controllers
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/25 12:29
 */
import { ContentTypeEnum } from "../enums/ContentTypeEnum";
import { RequestMethod } from "../enums/RequestMethod";
import { ControllerArgument } from "../model/ControllerArgument";
import { RequestFrequency } from "../enums/RequestFrequency";
export declare class Controllers {
    /**
     * 方法功能描述: 增加controller
     * @author yanshaowen
     * @date 2018/12/26 13:36
     * @param clazz         对应controller的类
     * @param functionName  对应执行函数的名称
     * @param path          uri地址
     * @param method        http方法
     * @param frequency
     * @return void
     */
    static addController(clazz: (new () => object), functionName: string, path: string, method: RequestMethod, frequency: RequestFrequency): void;
    /***
     * 方法功能描述: 设置路由前缀
     * @author yanshaowen
     * @date 2018/12/26 13:39
     * @param clazz     对应controller的类
     * @param path      前缀uri
     * @param method    未使用
     * @param frequency
     * @return
     */
    static setPrefix(clazz: (new () => object), path: string, method: RequestMethod, frequency: RequestFrequency): void;
    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz             对应controller的类
     * @param functionName      方法名称
     * @param paramIndex        参数的位置
     * @param paramInName       参数对内的名称
     * @param paramOutName      参数对外的名称
     * @param paramType         参数类型
     * @return
     */
    static addInParams(clazz: (new () => object), functionName: string, paramIndex: number, paramInName: string, paramOutName: string, paramType: (new () => object)): void;
    /**
     * 方法功能描述: 设置header头
     * @author yanshaowen
     * @date 2019/1/4 15:08
     * @param clazz                 对应controller的类
     * @param functionName          方法名称
     * @param requestContentType    请求的content-type
     * @param responseContentType   响应的content-type
     * @return
     */
    static setHeader(clazz: (new () => object), functionName: string, requestContentType: ContentTypeEnum, responseContentType: ContentTypeEnum): void;
    /**
     * 方法功能描述: 设置params中的入参名称及返回值
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param clazz
     * @param functionName
     * @param paramIndex
     * @return
     */
    static addInBody(clazz: (new () => object), functionName: string, paramIndex: number): void;
    static getAll(): Controller[];
    private static controllers;
}
export declare class Controller {
    clazz: (new () => object);
    functionName: string;
    path: string;
    method: RequestMethod;
    controllerArguments: ControllerArgument[];
    requestContentType: ContentTypeEnum;
    responseContentType: ContentTypeEnum;
    frequency: RequestFrequency;
}
