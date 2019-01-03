/**
 * 转换工具类
 */
export class ConvertUtil {
    // 下划线转换驼峰
    public static toHump(name: string) {
        return name.replace(/\_(\w)/g, (all, letter) => {
            return letter.toUpperCase();
        });
    }
    // 驼峰转换下划线
    public static toLine(name: string) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
}
