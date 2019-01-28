"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: MapperScan的配置
 *
 * @className Mappers
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 17:48
 */
class Mappers {
    static setMapper(name, value) {
        Mappers.mappers.set(name, value);
    }
    static getMapper(name) {
        return Mappers.mappers.get(name);
    }
    static getMappers() {
        return Mappers.mappers;
    }
}
Mappers.mappers = new Map();
exports.Mappers = Mappers;
//# sourceMappingURL=Mappers.js.map