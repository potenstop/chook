/**
 *
 * 功能描述: 所有的controller
 *
 * @className Controllers
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/25 12:29
 */
import {RequestMethod} from "../enums/RequestMethod";

export class Controllers {
    /**
     * 方法功能描述: 增加controller
     * @author yanshaowen
     * @date 2018/12/26 13:36
     * @param clazz         对应controller的类
     * @param functionName  对应执行函数的名称
     * @param path          uri地址
     * @param method        http方法
     * @return void
     */
    public static addController(clazz: (new () => object), functionName: string, path: string, method: RequestMethod): void {
        const controller = new Controller();
        controller.clazz = clazz;
        controller.functionName = functionName;
        controller.path = path;
        controller.method = method;
        Controllers.controllers.push(controller);
    }
    /***
     * 方法功能描述: 设置路由前缀
     * @author yanshaowen
     * @date 2018/12/26 13:39
     * @param clazz     对应controller的类
     * @param path      前缀uri
     * @param method    未使用
     * @return
     */
    public static setPrefix(clazz: (new () => object), path: string, method: RequestMethod): void {
        Controllers.controllers.forEach((controller: Controller) => {
           if (clazz === controller.clazz) {
               if (!(controller.path === "/" && path === "/")) {
                   // 增加前缀
                   controller.path = path + controller.path;
               }
           }
        });
    }

    /**
     * 方法功能描述: 设置对应的参数参数检查为开启
     * @author yanshaowen
     * @date 2018/12/27 13:03
     * @param
     * @return
     */
    public static setValidOpenByParam(clazz: (new () => object), functionName: string, paramIndex: number, isOpen: boolean): void {

    }


    public static getAll(): Controller[] {
        return Controllers.controllers;
    }

    private static controllers: Controller[] = [];
}
export class Controller {
    // controller class
    public clazz: (new () => object);
    // controller name
    public functionName: string;
    // uri
    public path: string;
    // 没有指定则所有方法
    public method: RequestMethod;
}
