/**
 *
 * 功能描述:
 *
 * @className ComponentScan
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/24 10:39
 */
import * as path from "path";
import {StringUtil} from "../../util/StringUtil";
import {FileUtil} from "../../util/FileUtil";
// @ComponentScan("@controller") 加载controller
// @ComponentScan("@service") 加载service
export function ComponentScan(value: string): CallableFunction;
export function ComponentScan(value: string): CallableFunction {
    return (target: (new () => object)): void => {
        if (StringUtil.isNotBank(value)) {
            let p = "";
            if (value[0] === "@") {
                p = path.join(process.cwd(),  "/src/", value.substring(1));
            } else {
                p = path.join(value);
            }
            const files = FileUtil.loadDirFiles(p);
            for (const file of files) {
                require(file);
            }
        }
    };
}
