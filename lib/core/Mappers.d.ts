/**
 *
 * 功能描述: MapperScan的配置
 *
 * @className Mappers
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 17:48
 */
export declare class Mappers {
    static setMapper(name: string, value: (new () => object)): void;
    static getMapper(name: string): (new () => object);
    static getMappers(): Map<string, new () => object>;
    private static mappers;
}
