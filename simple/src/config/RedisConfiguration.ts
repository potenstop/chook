import {Bean, Configuration, RestDataSource, MapperScan} from "papio-common";
import { IDataSource } from "type-interface";
import {RedisDataSource} from "../../../src/data/redis/RedisDataSource";

/**
 *
 * 功能描述:
 *
 * @className RedisConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/19 10:25
 */
@Configuration
@MapperScan("@../simple/src/dao/redis")
// @MapperScan("@dao/redis")
export class RedisConfiguration {
    @Bean
    public redisDataSourceMaster(): IDataSource {
        const dataSource = new RedisDataSource();
        dataSource.setName("redis-master");
        dataSource.setReadOnly(false);
        dataSource.setUrl("redis://localhost:6379/1");
        dataSource.build();
        return dataSource;
    }
}
