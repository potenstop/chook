export declare class ValidError<T> extends Error {
    argsName: string;
    argsValue: T;
    stack: string;
    validRule: string;
    static STATUS: number;
    getValidMessage(): string;
    getStack(): string;
}
