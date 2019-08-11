/**
 *
 * 功能描述: 数据配置
 *
 * @className DataSourceConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 9:39
 */
import {Bean, Configuration, MapperScan, TypeDataSource} from "../../../src/papio";
import { IDataSource } from "type-interface";

@Configuration
@MapperScan("@../simple/src/dao/common-util")
// @MapperScan("@dao/common-util")
export class MysqlCommonUtilConfiguration {
    @Bean
    public dataSourceMaster(): IDataSource {
        const typeDataSource = new TypeDataSource();
        typeDataSource.setName("mysql-master");
        typeDataSource.setUrl("mysql://127.0.0.1:3306/common_util?logging=true");
        typeDataSource.setUsername("common_util_root");
        typeDataSource.setPassword("123456");
        typeDataSource.setEntities(["src/model/dto/common-util/*.ts"]);
        typeDataSource.build();
        return typeDataSource;
    }
    @Bean
    public dataSourceSlave1(): IDataSource {
        const typeDataSource = new TypeDataSource();
        typeDataSource.setName("mysql-slave1");
        typeDataSource.setReadOnly(true);
        typeDataSource.setUrl("mysql://127.0.0.1:3306/common_util?logging=true");
        typeDataSource.setUsername("common_util_slave1");
        typeDataSource.setPassword("123456");
        typeDataSource.setEntities(["src/model/dto/common-util/*.ts"]);
        typeDataSource.build();
        return typeDataSource;
    }
    @Bean
    public dataSourceSlave2(): IDataSource {
        const typeDataSource = new TypeDataSource();
        typeDataSource.setName("mysql-slave2");
        typeDataSource.setReadOnly(true);
        typeDataSource.setUrl("mysql://127.0.0.1:3306/common_util?logging=true");
        typeDataSource.setUsername("common_util_slave2");
        typeDataSource.setPassword("123456");
        typeDataSource.setEntities(["src/model/dto/common-util/*.ts"]);
        typeDataSource.build();
        return typeDataSource;
    }
}
