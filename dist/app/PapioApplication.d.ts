/// <reference types="node" />
import ProcessEnv = NodeJS.ProcessEnv;
export declare class PapioApplication {
    static run(startClass: (new () => object), processEnv: ProcessEnv): Promise<void>;
    private startClass;
    private processEnv;
    private run;
}
