/**
 *
 * 功能描述: 开启自动配置  加载
 *
 * @className EnableAutoConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 10:36
 */
import * as  KoaBodyParser from "koa-bodyparser";
import * as  KoaRouter from "koa-router";
import "reflect-metadata";
import {KoaApplication} from "../../app/KoaApplication";
import {DefaultGlobalConfigBean} from "../../core/GlobalConfigBean";
import {RequestHeaderError} from "../../error/RequestHeaderError";
import "../../core/Hook";
import {HttpContent} from "../../context/HttpContent";
import {HookLog} from "../../core/Hook";
import {GenerateUtil} from "../../util/GenerateUtil";

import {Logger, LoggerFactory} from "type-slf4";
import * as path from "path";
import {PapioEmitterDefault} from "../../core/PapioEmitterDefault";
import {EmitterEnum} from "../../enums/EmitterEnum";
import {Controller, Controllers} from "../../core/Controllers";
import {StringUtil} from "../../util/StringUtil";
import {JSHelperUtil} from "../../util/JSHelperUtil";
import {RequestMethod} from "../../enums/RequestMethod";
import {MetaConstant} from "../../constants/MetaConstant";
import {ControllerArgumentSourceEnum} from "../../enums/ControllerArgumentSourceEnum";
import {JsonProtocol} from "../../protocol/JsonProtocol";
import {ValidError} from "../../error/ValidError";
import {ContentTypeEnum} from "../../enums/ContentTypeEnum";
import {HttpStatusEnum} from "../../enums/HttpStatusEnum";
import {CommonConstant} from "../../constants/CommonConstant";
import {Beans} from "../../core/Beans";
import {ControllerArgument} from "../../model/ControllerArgument";

const logger = LoggerFactory.getLogger("papio.annotation.initialize.EnableAutoConfiguration");

// @EnableAutoConfiguration 无参数类装饰器
export function EnableAutoConfiguration(target: (new () => object)): void;
// @EnableAutoConfiguration('name') 参数为name的类装饰器
export function EnableAutoConfiguration(target: string): CallableFunction;
// @EnableAutoConfiguration({name:'name'}) 参数为options的类装饰器
export function EnableAutoConfiguration(target: Options): CallableFunction;
export function EnableAutoConfiguration(target: (new () => object) | Options | string): void | CallableFunction {
    let options = new Options();
    options.name = "default";
    if (target instanceof Function) {
        // 无参数装饰器
        execOn(target, options);
    } else {
        // 有参数装饰器
        return (target1: (new () => object)): void => {
            if (target instanceof Options) {
                options = target;
            } else if (typeof target === "string") {
                options.name = target;
            }
            execOn(target1, options);
        };
    }
}

class Options {
    // default: 默认
    public name: string;
}

/**
 * 加载本地的application.json
 */
function loadApplication() {
    const papioEmitter = PapioEmitterDefault.getDefault();
    papioEmitter.emit(EmitterEnum.LOAD_TASK_APOLLO);
    let applicationConfig = {};
    try {
        applicationConfig = require(path.join(process.cwd(), "resources/application.json"));
    } catch (e) {
        logger.warn("not found file application.json");
    }
    const applicationMap = new Map<string, string>();
    // 遍历json
    eachConfig(applicationConfig, null, applicationMap);
    // 注入到全局变量中
    // @ts-ignore
    global.papioApplication = applicationMap;
    const keys = new Set<string>();
    applicationMap.forEach((value, key) => {
        keys.add(key);
    });
    // @ts-ignore
    global.papioApplicationSourceKeys = keys;
    papioEmitter.emit(EmitterEnum.AUTO_CONFIGURATION);

}

/***
 * json转pr
 * @param config
 * @param parentKey
 * @param applicationMap
 */
function eachConfig(config, parentKey: string, applicationMap: Map<string, string>) {
    let head = "";
    if (parentKey !== null) {
        head = `${parentKey}.`;
    }
    if (Array.isArray(config)) {
        config.forEach((v, i) => {
            eachConfig(v, `${head}[${i}]`, applicationMap);
        });
    } else if (typeof config === "object") {
        Object.keys(config).forEach((k) => {
            eachConfig(config[k], `${head}${k}`, applicationMap);
        });
    } else if (typeof config === "number") {
        applicationMap.set(parentKey, config + "");
    } else if (typeof config === "string") {
        applicationMap.set(parentKey, config);
    } else if (typeof config === "boolean") {
        applicationMap.set(parentKey, config + "");
    } else {
        console.warn("load application config error, type error type:[{}] value:[{}]", typeof config, config);
    }
}
// 加载application配置
loadApplication();
function execOn(target: (new () => object), options: Options) {
    const papioEmitter = PapioEmitterDefault.getDefault();
    papioEmitter.once(EmitterEnum.LOAD_TASK_APOLLO, () => {
        exec(target, options);
    });
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
            const defaultMap = new Map<string, new () => object>();
            logger.debug(`use url(${controller.path}), method(${routerMethod})`);
            koaRouter[routerMethod](controller.path, async (ctx) => {
                try {
                    // 检验请求头content-type
                    if (!JSHelperUtil.isNullOrUndefined(controller.requestContentType) && ctx.method !== RequestMethod.GET && !ctx.is(controller.requestContentType)) {
                        throw new RequestHeaderError(`content-type=${ctx.header["content-type"]},allow content-type is ${controller.requestContentType}`);
                    }
                    const existInstance = new Map<Object, object>();
                    const o = Reflect.construct(controller.clazz, [existInstance]);
                    const controllerArguments = Reflect.getOwnMetadata(MetaConstant.CONTROLLER_ARGUMENTS, controller.clazz.prototype.constructor, controller.functionName) || new Array<ControllerArgument>();
                    const args = [];
                    for (const controllerArgument of controllerArguments) {
                        let v = null;
                        if (JSHelperUtil.isBaseType(controllerArgument.type)) {
                            if (controllerArgument.source === ControllerArgumentSourceEnum.PARAMS) {
                                if (controllerArgument.outName in ctx.query) {
                                    v = ctx.query[controllerArgument.outName];
                                }
                            } else if (controllerArgument.source === ControllerArgumentSourceEnum.BODY) {
                                if (controllerArgument.outName in ctx.request.body) {
                                    v = ctx.request.body[controllerArgument.outName];
                                }
                            } else if (controllerArgument.source === ControllerArgumentSourceEnum.HEADER) {
                                if (controllerArgument.outName in ctx.header) {
                                    v = ctx.header[controllerArgument.outName];
                                }
                            }
                        } else if (JSHelperUtil.isClassType(controllerArgument.type)) {
                            if (controllerArgument.source === ControllerArgumentSourceEnum.PARAMS) {
                                v = JsonProtocol.jsonToBean(ctx.query, controllerArgument.type, defaultMap);
                            } else if (controllerArgument.source === ControllerArgumentSourceEnum.BODY) {
                                v = JsonProtocol.jsonToBean(ctx.body, controllerArgument.type, defaultMap);
                            } else if (controllerArgument.source === ControllerArgumentSourceEnum.HEADER) {
                                v = JsonProtocol.jsonToBean(ctx.header, controllerArgument.type, defaultMap);
                            }
                        }
                        // 类型转换 null 或者undefined 不转换 如果失败则直接抛出错误
                        if (!JSHelperUtil.isNullOrUndefined(v)) {
                            if (JSHelperUtil.isBaseType(controllerArgument.type)) {
                                v = controllerArgument.type(v);
                                // number类型则判断NaN
                                if (controllerArgument.type === Number && isNaN(controllerArgument.type(v))) {
                                    const validTypeError = new ValidError<string>("type transform error");
                                    validTypeError.argsName = controllerArgument.inName;
                                    validTypeError.argsValue = v;
                                    validTypeError.validRule = "typeCheck";
                                    throw validTypeError;
                                }
                            }
                        }
                        args[controllerArgument.index] = v;

                    }
                    const httpContent = new HttpContent();
                    httpContent.headers = new Map<string, string>();
                    Object.keys(ctx.headers).forEach((key) => {
                        httpContent.headers.set(key, ctx.headers[key]);
                    });
                    if (!httpContent.headers.has("request-id")) {
                        // 框架生成
                        httpContent.headers.set("request-id", GenerateUtil.getRequestId());
                    }
                    HookLog.setHttpContext(httpContent);
                    const result = await Reflect.apply(controller.clazz.prototype[controller.functionName], o, args);
                    // 检查响应头的content-type
                    if (controller.responseContentType === ContentTypeEnum.APPLICATION_JSON) {
                        // bean转json
                        const returnGenerics = Reflect.getOwnMetadata(MetaConstant.BEAN_RETURN_GENERICS, controller.clazz.prototype, controller.functionName) ||
                            new Map<string, new () => object>();
                        ctx.body = JsonProtocol.toJson(result, returnGenerics);
                        ctx.status = HttpStatusEnum.OK;
                    } else {
                        throw new RequestHeaderError(`response content-type=${controller.responseContentType} error`);
                    }
                } catch (e) {
                    logger.error("aop error", e);
                    if (e instanceof ValidError) {
                        ctx.body = {message: e.getValidMessage()};
                        ctx.status = ValidError.STATUS;
                    } else if (e instanceof RequestHeaderError) {
                        ctx.body = {message: e.message};
                        ctx.status = RequestHeaderError.STATUS;
                    } else {
                        ctx.body = {message: "unknown error, message=" + e.message};
                        ctx.status = HttpStatusEnum.SERVER_ERROR;
                    }
                }
            });
        });
        defaultGlobalConfigBean.middleware.push(koaRouter.routes());
        defaultGlobalConfigBean.middleware.push(koaRouter.allowedMethods());
        defaultGlobalConfigBean.application.on("error", (error, ctx) => {
            if (ctx.status === HttpStatusEnum.NOT_FOUND) {
                logger.debug(`url=${ctx.url}, method=${ctx.method} not found`);
                ctx.body = {message: `url=${ctx.url}, method=${ctx.method} not found`};
            } else if (ctx.status === HttpStatusEnum.SERVER_ERROR) {
                logger.debug(`url=${ctx.url}, method=${ctx.method} server error`);
                ctx.body = {message: `url=${ctx.url}, method=${ctx.method} server error`};
            } else {
                logger.debug(`url=${ctx.url}, method=${ctx.method} unknown`);
                ctx.body = {message: `url=${ctx.url}, method=${ctx.method} unknown`};

            }
        });
        const startArgs: any = Beans.getBean(CommonConstant.START_ARGS);
        if (startArgs && "port" in startArgs) {
            defaultGlobalConfigBean.port = startArgs.port;
        }
        // 设置bean
        Beans.setBean(CommonConstant.GLOBAL_CONFIG, defaultGlobalConfigBean);
        const papioEmitter = PapioEmitterDefault.getDefault();
        papioEmitter.emit(EmitterEnum.MIDDLEWARE);
    }
    // 加载bean
    /*const beans = Beans.getBeans();
    beans.forEach((obj, key) => {
         if (JSHelperUtil.isClassObject(obj)) {
              if (key === "logStatic") {
                   // 加载静态日志
                   Object.keys(obj).map((objKey) => {
                        BaseLog.setExtStaticField(objKey, String(obj[objKey]));
                   });
              }
         }
    });*/
}
