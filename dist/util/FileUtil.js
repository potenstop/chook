"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述:
 *
 * @className FileUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/3 13:07
 */
const fs = require("fs");
const path = require("path");
class FileUtil {
    /**
     *
     * @param startPath  起始目录文件夹路径
     * @returns {Array}
     */
    static loadDirFiles(startPath) {
        const result = [];
        function finder(p) {
            let files;
            try {
                files = fs.readdirSync(p);
            }
            catch (e) {
            }
            if (files) {
                files.forEach((val, index) => {
                    const fPath = path.join(p, val);
                    const stats = fs.statSync(fPath);
                    if (stats.isDirectory()) {
                        finder(fPath);
                    }
                    if (stats.isFile()) {
                        result.push(path.resolve(fPath));
                    }
                });
            }
        }
        finder(startPath);
        return result;
    }
    /**
     * 方法功能描述: 查找包括自己的所有父级路径
     * @author yanshaowen
     * @date 2019/1/22 20:32
     * @param source    原始路径
     * @return          路径列表
     */
    static findParents(source) {
        const arr = [];
        function func(current) {
            arr.push(current);
            current = path.join(current);
            const parent = path.resolve(current, "..");
            if (parent !== current) {
                func(parent);
            }
        }
        func(source);
        return arr;
    }
}
exports.FileUtil = FileUtil;
//# sourceMappingURL=FileUtil.js.map