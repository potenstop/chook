"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: 开启自动配置  加载
 *
 * @className EnableAutoConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 10:36
 */
const KoaBodyParser = require("koa-bodyparser");
const KoaRouter = require("koa-router");
require("reflect-metadata");
const KoaApplication_1 = require("../../app/KoaApplication");
const CommonConstant_1 = require("../../constants/CommonConstant");
const HttpStatusEnum_1 = require("../../enums/HttpStatusEnum");
const MetaConstant_1 = require("../../constants/MetaConstant");
const Beans_1 = require("../../core/Beans");
const Controllers_1 = require("../../core/Controllers");
const GlobalConfigBean_1 = require("../../core/GlobalConfigBean");
const ControllerArgumentSourceEnum_1 = require("../../enums/ControllerArgumentSourceEnum");
const ValidError_1 = require("../../error/ValidError");
const JSHelperUtil_1 = require("../../util/JSHelperUtil");
const StringUtil_1 = require("../../util/StringUtil");
const RequestHeaderError_1 = require("../../error/RequestHeaderError");
const RequestMethod_1 = require("../../enums/RequestMethod");
const ContentTypeEnum_1 = require("../../enums/ContentTypeEnum");
const JsonProtocol_1 = require("../../protocol/JsonProtocol");
const ApplicationLog_1 = require("../../log/ApplicationLog");
require("../../core/Hook");
const HttpContent_1 = require("../../context/HttpContent");
const Hook_1 = require("../../core/Hook");
const GenerateUtil_1 = require("../../util/GenerateUtil");
const BaseLog_1 = require("../../log/BaseLog");
function EnableAutoConfiguration(target) {
    let options = new Options();
    options.name = "default";
    if (target instanceof Function) {
        // 无参数装饰器
        exec(target, options);
    }
    else {
        // 有参数装饰器
        return (target1) => {
            if (target instanceof Options) {
                options = target;
            }
            else if (typeof target === "string") {
                options.name = target;
            }
            exec(target1, options);
        };
    }
}
exports.EnableAutoConfiguration = EnableAutoConfiguration;
class Options {
}
function exec(target, options) {
    if (options.name === "default") {
        const defaultGlobalConfigBean = new GlobalConfigBean_1.DefaultGlobalConfigBean();
        defaultGlobalConfigBean.application = new KoaApplication_1.KoaApplication();
        defaultGlobalConfigBean.middleware = [];
        // 请求参数转换中间件
        defaultGlobalConfigBean.middleware.push(KoaBodyParser());
        // 路由中间件
        const koaRouter = new KoaRouter();
        Controllers_1.Controllers.getAll().forEach((controller) => {
            let routerMethod = "all";
            if (StringUtil_1.StringUtil.isNotBank(controller.method)) {
                routerMethod = controller.method.toLowerCase();
            }
            const defaultMap = new Map();
            ApplicationLog_1.ApplicationLog.debug(`use url(${controller.path}), method(${routerMethod})`);
            koaRouter[routerMethod](controller.path, async (ctx) => {
                try {
                    // 检验请求头content-type
                    if (!JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(controller.requestContentType) && ctx.method !== RequestMethod_1.RequestMethod.GET && !ctx.is(controller.requestContentType)) {
                        throw new RequestHeaderError_1.RequestHeaderError(`content-type=${ctx.header["content-type"]},allow content-type is ${controller.requestContentType}`);
                    }
                    const o = Reflect.construct(controller.clazz, []);
                    const controllerArguments = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.CONTROLLER_ARGUMENTS, controller.clazz.prototype.constructor, controller.functionName) || new Array();
                    const args = [];
                    for (const controllerArgument of controllerArguments) {
                        let v = null;
                        if (JSHelperUtil_1.JSHelperUtil.isBaseType(controllerArgument.type)) {
                            if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.PARAMS) {
                                if (controllerArgument.outName in ctx.query) {
                                    v = ctx.query[controllerArgument.outName];
                                }
                            }
                            else if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.BODY) {
                                if (controllerArgument.outName in ctx.request.body) {
                                    v = ctx.request.body[controllerArgument.outName];
                                }
                            }
                            else if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.HEADER) {
                                if (controllerArgument.outName in ctx.header) {
                                    v = ctx.header[controllerArgument.outName];
                                }
                            }
                        }
                        else if (JSHelperUtil_1.JSHelperUtil.isClassType(controllerArgument.type)) {
                            if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.PARAMS) {
                                v = JsonProtocol_1.JsonProtocol.jsonToBean(ctx.query, controllerArgument.type, defaultMap);
                            }
                            else if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.BODY) {
                                v = JsonProtocol_1.JsonProtocol.jsonToBean(ctx.body, controllerArgument.type, defaultMap);
                            }
                            else if (controllerArgument.source === ControllerArgumentSourceEnum_1.ControllerArgumentSourceEnum.HEADER) {
                                v = JsonProtocol_1.JsonProtocol.jsonToBean(ctx.header, controllerArgument.type, defaultMap);
                            }
                        }
                        // 类型转换 null 或者undefined 不转换 如果失败则直接抛出错误
                        if (!JSHelperUtil_1.JSHelperUtil.isNullOrUndefined(v)) {
                            if (JSHelperUtil_1.JSHelperUtil.isBaseType(controllerArgument.type)) {
                                v = controllerArgument.type(v);
                                // number类型则判断NaN
                                if (controllerArgument.type === Number && isNaN(controllerArgument.type(v))) {
                                    const validTypeError = new ValidError_1.ValidError("type transform error");
                                    validTypeError.argsName = controllerArgument.inName;
                                    validTypeError.argsValue = v;
                                    validTypeError.validRule = "typeCheck";
                                    throw validTypeError;
                                }
                            }
                        }
                        args[controllerArgument.index] = v;
                    }
                    const httpContent = new HttpContent_1.HttpContent();
                    httpContent.headers = new Map();
                    Object.keys(ctx.headers).forEach((key) => {
                        httpContent.headers.set(key, ctx.headers[key]);
                    });
                    if (!httpContent.headers.has("request-id")) {
                        // 框架生成
                        httpContent.headers.set("request-id", GenerateUtil_1.GenerateUtil.getRequestId());
                    }
                    Hook_1.HookLog.setHttpContext(httpContent);
                    const result = await Reflect.apply(controller.clazz.prototype[controller.functionName], o, args);
                    // 检查响应头的content-type
                    if (controller.responseContentType === ContentTypeEnum_1.ContentTypeEnum.APPLICATION_JSON) {
                        // bean转json
                        const returnGenerics = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.BEAN_RETURN_GENERICS, controller.clazz.prototype, controller.functionName) ||
                            new Map();
                        ctx.body = JsonProtocol_1.JsonProtocol.toJson(result, returnGenerics);
                        ctx.status = HttpStatusEnum_1.HttpStatusEnum.OK;
                    }
                    else {
                        throw new RequestHeaderError_1.RequestHeaderError(`response content-type=${controller.responseContentType} error`);
                    }
                }
                catch (e) {
                    ApplicationLog_1.ApplicationLog.error("aop error", e);
                    if (e instanceof ValidError_1.ValidError) {
                        ctx.body = { message: e.getValidMessage() };
                        ctx.status = ValidError_1.ValidError.STATUS;
                    }
                    else if (e instanceof RequestHeaderError_1.RequestHeaderError) {
                        ctx.body = { message: e.message };
                        ctx.status = RequestHeaderError_1.RequestHeaderError.STATUS;
                    }
                    else {
                        ctx.body = { message: "unknown error, message=" + e.message };
                        ctx.status = HttpStatusEnum_1.HttpStatusEnum.SERVER_ERROR;
                    }
                }
            });
        });
        defaultGlobalConfigBean.middleware.push(koaRouter.routes());
        defaultGlobalConfigBean.middleware.push(koaRouter.allowedMethods());
        defaultGlobalConfigBean.application.on("error", (error, ctx) => {
            if (ctx.status === HttpStatusEnum_1.HttpStatusEnum.NOT_FOUND) {
                ApplicationLog_1.ApplicationLog.debug(`url=${ctx.url}, method=${ctx.method} not found`);
                ctx.body = { message: `url=${ctx.url}, method=${ctx.method} not found` };
            }
            else if (ctx.status === HttpStatusEnum_1.HttpStatusEnum.SERVER_ERROR) {
                ApplicationLog_1.ApplicationLog.debug(`url=${ctx.url}, method=${ctx.method} server error`);
                ctx.body = { message: `url=${ctx.url}, method=${ctx.method} server error` };
            }
            else {
                ApplicationLog_1.ApplicationLog.debug(`url=${ctx.url}, method=${ctx.method} unknown`);
                ctx.body = { message: `url=${ctx.url}, method=${ctx.method} unknown` };
            }
        });
        const startArgs = Beans_1.Beans.getBean(CommonConstant_1.CommonConstant.START_ARGS);
        if (startArgs && "port" in startArgs) {
            defaultGlobalConfigBean.port = startArgs.port;
        }
        // 设置bean
        Beans_1.Beans.setBean(CommonConstant_1.CommonConstant.GLOBAL_CONFIG, defaultGlobalConfigBean);
    }
    // 加载bean
    const beans = Beans_1.Beans.getBeans();
    beans.forEach((obj, key) => {
        if (JSHelperUtil_1.JSHelperUtil.isClassObject(obj)) {
            if (key === "logStatic") {
                // 加载静态日志
                Object.keys(obj).map((objKey) => {
                    BaseLog_1.BaseLog.setExtStaticField(objKey, String(obj[objKey]));
                });
            }
        }
    });
}
//# sourceMappingURL=EnableAutoConfiguration.js.map