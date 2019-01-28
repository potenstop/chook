"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className Bean
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 10:38
 */
const Beans_1 = require("../../core/Beans");
const StringUtil_1 = require("../../util/StringUtil");
const MetaConstant_1 = require("../../constants/MetaConstant");
function Bean(target, propertyKey) {
    if (typeof target === "object" && typeof propertyKey === "string") {
        // 无参数装饰器
        exec(target, propertyKey, new Options());
    }
    else {
        // 有参数装饰器
        return (target1, propertyKey1, descriptor) => {
            let options = new Options();
            if (typeof target === "string") {
                options.name = target;
            }
            else if (target instanceof Options) {
                options = target;
            }
            exec(target1, propertyKey1, options);
        };
    }
}
exports.Bean = Bean;
class Options {
}
/***
 * 方法功能描述:
 * @author yanshaowen
 * @date 2018/12/24 11:59
 * @param.target            object
 * @param.propertyKey       string
 * @param.options           Options
 * @return
 */
function exec(target, propertyKey, options) {
    const beanObject = target[propertyKey]();
    if (StringUtil_1.StringUtil.isNotBank(options.name)) {
        propertyKey = options.name;
    }
    // 设置bean的key
    const keys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.BEANS, target) || new Set();
    keys.add(propertyKey);
    Reflect.defineMetadata(MetaConstant_1.MetaConstant.BEANS, keys, target);
    Beans_1.Beans.setBean(propertyKey, beanObject);
}
//# sourceMappingURL=Bean.js.map