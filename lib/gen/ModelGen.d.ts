import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import GenConfig from "../model/GenConfig";
export default class ModelGen {
    private static endLine;
    private typeormConfig;
    private genConfig;
    constructor(typeormConfig: ConnectionOptions);
    gen(genConfig: GenConfig): Promise<boolean>;
    private mysqlGen;
}
