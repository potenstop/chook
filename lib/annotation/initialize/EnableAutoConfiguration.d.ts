import "reflect-metadata";
import "../../core/Hook";
export declare function EnableAutoConfiguration(target: (new () => object)): void;
export declare function EnableAutoConfiguration(target: string): CallableFunction;
export declare function EnableAutoConfiguration(target: Options): CallableFunction;
declare class Options {
    name: string;
}
export {};
