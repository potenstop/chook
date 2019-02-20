import {RedisDataSource} from "../../../../src/data/redis/RedisDataSource";
import {RedisConnection} from "../../../../src/data/redis/RedisConnection";

/**
 *
 * 功能描述:
 *
 * @className RedisDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/18 10:30
 */
describe("redis", () => {
    it("return member", async () => {
        const dataSource = new RedisDataSource();
        dataSource.setName("redis-master");
        dataSource.setReadOnly(false);
        dataSource.setUrl("redis://localhost:6379/1");
        dataSource.build();
        const connection = await dataSource.getConnection() as RedisConnection;
        const result = await connection.execCommandSerialize("get", ["test"], new Map<string, any>().set("__root", String).set("Array", Boolean));
        console.log(result);
    });
})
