"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const RequestRedisCommand_1 = require("../../enums/RequestRedisCommand");
const MetaConstant_1 = require("../../constants/MetaConstant");
function RequestRedisMapping(target) {
    let options = {};
    if (typeof target === "string") {
        options.path = target;
    }
    else {
        options = target;
    }
    if (!options.command) {
        options.command = RequestRedisCommand_1.RequestRedisCommand.GET;
    }
    return (target1, propertyKey) => {
        const dataValueMap = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.REQUEST_REDIS_MAPPING, target1) || new Map();
        dataValueMap.set(propertyKey, options);
        Reflect.defineMetadata(MetaConstant_1.MetaConstant.REQUEST_REDIS_MAPPING, dataValueMap, target1);
    };
}
exports.RequestRedisMapping = RequestRedisMapping;
//# sourceMappingURL=RequestRedisMapping.js.map