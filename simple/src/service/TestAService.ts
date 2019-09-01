/**
 *
 * 功能描述:
 *
 * @className TestAService
 * @projectName papio
 * @author yanshaowen
 * @date 2019/8/31 9:03
 */
import {AbstractDefinition} from "../../../src/annotation/bean/AbstractDefinition";

@AbstractDefinition
export abstract class TestAService {
    public abstract getA();
    public abstract getC();
}
