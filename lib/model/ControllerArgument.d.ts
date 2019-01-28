/**
 *
 * 功能描述: controller的请求参数
 *
 * @className ControllerArgument
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/1 20:08
 */
import { ControllerArgumentSourceEnum } from "../enums/ControllerArgumentSourceEnum";
export declare class ControllerArgument {
    index: number;
    inName: string;
    outName: string;
    type: new () => object;
    source: ControllerArgumentSourceEnum;
}
