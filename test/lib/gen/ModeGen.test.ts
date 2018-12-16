import { ModelGen } from "../../../lib/gen/ModelGen"
import { GenConfig } from "../../../lib/config/GenConfig"
import { expect } from 'chai';


let genConfig = new GenConfig();
genConfig.spaceLength = 4;
genConfig.isEndSemicolon = false;
genConfig.tableName = 'shell_task';
genConfig.modelName = 'ShellTask';

let modelGen = new ModelGen({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "common_util_root",
    "password": "123456",
    "database": "common_util",
    "synchronize": false,
    "logging": true,
    "entities": [
        "simple/src/model/dto/db/auto/*.ts"
    ],
    "cli": {
        "entitiesDir": "simple/src/model/dto/db/auto"
    }
});
describe('测试 ModelGen', function () {
    it('gen()', async function () {
        expect(await modelGen.gen(genConfig)).to.equal(true);
    });
});