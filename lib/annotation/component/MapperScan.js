"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringUtil_1 = require("../../util/StringUtil");
const Mappers_1 = require("../../core/Mappers");
const path = require("path");
/**
 *
 * 功能描述: 指定包下的文件都使用对应的数据源
 *
 * @className MapperScan
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 17:40
 */
function MapperScan(value) {
    return (target) => {
        if (StringUtil_1.StringUtil.isNotBank(value)) {
            let p = "";
            if (value[0] === "@") {
                p = path.join(process.cwd(), "/src/", value.substring(1));
            }
            else {
                p = path.join(value);
            }
            Mappers_1.Mappers.setMapper(p, target);
        }
    };
}
exports.MapperScan = MapperScan;
//# sourceMappingURL=MapperScan.js.map