export interface ISqlLogMeta {
    kind: "ISqlLogMeta";
    time?: number;
    query: string;
    parameters: any[];
    error?: string;
}
export interface IConsoleLogMeta {
    kind: "IConsoleLogMeta";
    stack: string;
    error: Error;
}
export declare class BaseLog {
    applicationLogger: import("winston").Logger;
    consoleLogger: import("winston").Logger;
    dataBaseLogger: import("winston").Logger;
    private static extStaticFields;
    static setExtStaticField(key: string, value: string): void;
    static getExtStaticFields(): Map<string, string>;
}
