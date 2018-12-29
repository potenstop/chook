/**
 *
 * 功能描述: 开启自动配置  加载
 *
 * @className EnableAutoConfiguration
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/24 10:36
 */
import * as  KoaBodyParser from "koa-bodyparser";
import * as  KoaRouter from "koa-router";
import "reflect-metadata";
import {KoaApplication} from "../../app/KoaApplication";
import {CommonConstant} from "../../constants/CommonConstant";
import {Beans} from "../../core/Beans";
import {Controller, Controllers} from "../../core/Controllers";
import {DefaultGlobalConfigBean} from "../../core/GlobalConfigBean";
import {ValidRequestError} from "../../error/ValidRequestError";
import {HttpStatusConstant} from "../../constants/HttpStatusConstant";
import {StringUtil} from "../../util/StringUtil";

// @EnableAutoConfiguration 无参数类装饰器
export function EnableAutoConfiguration(target: (new () => object)): void;
// @EnableAutoConfiguration('name') 参数为name的类装饰器
export function EnableAutoConfiguration(target: string): CallableFunction;
// @EnableAutoConfiguration({name:'name'}) 参数为options的类装饰器
export function EnableAutoConfiguration(target: Options): CallableFunction;
export function EnableAutoConfiguration(target: (new () => object) | Options| string): void | CallableFunction {
     let options = new Options();
     options.name = "default";
     if (target instanceof Function) {
          // 无参数装饰器
          exec(target, options);
     } else {
          // 有参数装饰器
          return (target1: (new () => object)): void =>  {
               if (target instanceof Options) {
                    options = target;
               } else if (typeof target === "string") {
                    options.name = target;
               }
               exec(target1, options);
          };
     }
}
class Options {
     // default: 默认
     public name: string;
}
function exec(target: (new () => object), options: Options) {
     if (options.name === "default") {
          const defaultGlobalConfigBean = new DefaultGlobalConfigBean();
          defaultGlobalConfigBean.application = new KoaApplication();
          defaultGlobalConfigBean.middleware = [];
          // 请求参数转换中间件
          defaultGlobalConfigBean.middleware.push(KoaBodyParser());
          // 路由中间件
          const koaRouter = new KoaRouter();
          Controllers.getAll().forEach((controller: Controller) => {
               let routerMethod = "all";
               if (StringUtil.isNotBank(controller.method)) {
                    routerMethod = controller.method.toLowerCase();
               }
               koaRouter[routerMethod](controller.path, async (ctx) => {
                    try {
                         const o = Reflect.construct(controller.clazz, []);
                         // 获取function的请求参数
                         const paramsTypes = Reflect.getMetadata("design:paramtypes", controller.clazz.prototype, controller.functionName);

                         ctx.body = await Reflect.apply(controller.clazz.prototype[controller.functionName], o, []);
                         ctx.state = HttpStatusConstant.OK;
                    } catch (e) {
                         if (e instanceof ValidRequestError) {
                              ctx.body = {message: e.getValidMessage()};
                              ctx.state = HttpStatusConstant.PARAMS_ERROR;
                         } else {
                              ctx.body = {message: "unknown error"};
                              ctx.state = 500;
                         }
                    }
               });
          });
          defaultGlobalConfigBean.middleware.push(koaRouter.routes());
          defaultGlobalConfigBean.middleware.push(koaRouter.allowedMethods());
          // 设置bean
          Beans.setBean(CommonConstant.GLOBAL_CONFIG, defaultGlobalConfigBean);
     }
}
