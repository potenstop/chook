import { IApplication } from "./IApplication";
export declare class KoaApplication implements IApplication {
    private app;
    constructor();
    start(hostname: string, port: number): Promise<void>;
    start(hostname: string): Promise<void>;
    start(port: number): Promise<void>;
    start(): Promise<void>;
    use(middleware: object): void;
}
