/**
 *
 * 功能描述:
 *
 * @className FileUtil
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/3 13:07
 */
import * as fs from "fs";
import * as path from "path";
export class FileUtil {
    /**
     *
     * @param startPath  起始目录文件夹路径
     * @returns {Array}
     */
    public static loadDirFiles(startPath: string): string[] {
        const result: string[] = [];
        function finder(p) {
            let files;
            try {
                files  = fs.readdirSync(p);
            } catch (e) {
            }
            if (files) {
                files.forEach((val, index) => {
                    const fPath = path.join(p, val);
                    const stats = fs.statSync(fPath);
                    if (stats.isDirectory()) { finder(fPath); }
                    if (stats.isFile()) { result.push(path.resolve(fPath)); }
                });
            }
        }

        finder(startPath);
        return result;
    }
}
