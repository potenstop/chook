import { StackTypeModeEnum } from "../enums/StackTypeModeEnum";
import { StackTypePathTypeEnum } from "../enums/StackTypePathTypeEnum";
/**
 *
 * 功能描述: stack类型对象
 *
 * @className StackType
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/20 20:45
 */
export default class StackType {
    className: string;
    methodName: string;
    file: string;
    line: number;
    row: number;
    pathType: StackTypePathTypeEnum;
    source: string;
    mode: StackTypeModeEnum;
}
