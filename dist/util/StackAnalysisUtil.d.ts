import { StackTypePathTypeEnum } from "../enums/StackTypePathTypeEnum";
import StackType from "../model/StackType";
/**
 *
 * 功能描述: 堆栈信息解析工具类
 * @className StackAnalysisUtil
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/20 20:24
 */
export declare class StackAnalysisUtil {
    /**
     * 获取标准的堆栈信息  执行时间大致为(4-7)ms
     * @param stack         new Error().stack
     * @param pathType      获取指定的堆栈类型 值对应下面的类型 其他值为获取所有所有类型
     * @return              返回的为数组 每个对象包括当前执行的所有堆栈信息
     */
    static parseStack(stack: string, pathType: StackTypePathTypeEnum): StackType[];
    static parseStackAll(stack: string): StackType[];
}
