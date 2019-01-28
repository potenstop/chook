"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className ComponentScan
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/24 10:39
 */
const path = require("path");
const FileUtil_1 = require("../../util/FileUtil");
const StringUtil_1 = require("../../util/StringUtil");
function ComponentScan(value) {
    return (target) => {
        if (StringUtil_1.StringUtil.isNotBank(value)) {
            let p = "";
            if (value[0] === "@") {
                p = path.join(process.cwd(), "/src/", value.substring(1));
            }
            else {
                p = path.join(value);
            }
            const files = FileUtil_1.FileUtil.loadDirFiles(p);
            for (const file of files) {
                require(file);
            }
        }
    };
}
exports.ComponentScan = ComponentScan;
//# sourceMappingURL=ComponentScan.js.map