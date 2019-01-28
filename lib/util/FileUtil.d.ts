export declare class FileUtil {
    /**
     *
     * @param startPath  起始目录文件夹路径
     * @returns {Array}
     */
    static loadDirFiles(startPath: string): string[];
    /**
     * 方法功能描述: 查找包括自己的所有父级路径
     * @author yanshaowen
     * @date 2019/1/22 20:32
     * @param source    原始路径
     * @return          路径列表
     */
    static findParents(source: string): string[];
}
