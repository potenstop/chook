import { ISavepoint } from "./ISavepoint";
/**
 *
 * 功能描述:
 *
 * @className CommonSavepoint
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/18 13:39
 */
export declare class CommonSavepoint implements ISavepoint {
    private readonly pointId;
    private readonly pointName;
    static uuid(len: any, radix: any): string;
    constructor();
    constructor(name: string);
    getSavepointId(): void;
    getSavepointName(): string;
}
