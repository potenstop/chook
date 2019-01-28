export declare class ApplicationLog {
    static info(msg: string): void;
    static warn(msg: string): void;
    static debug(msg: string): void;
    static error(msg: string): void;
    static error(msg: string, error: Error): void;
    private static log;
}
