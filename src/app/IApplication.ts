/**
 *
 * 功能描述:
 *
 * @className IApplication
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/22 15:27
 */
export interface IApplication {
    start(hostname: string, port: number): Promise<void>;
    start(hostname: string): Promise<void>;
    start(port: number): Promise<void>;
    start(): Promise<void>;
    use(middleware: Function): void;
    on(event: string | symbol, listener: (...args: any[]) => void): void;
}
