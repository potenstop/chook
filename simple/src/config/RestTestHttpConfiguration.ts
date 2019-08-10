/**
 *
 * 功能描述:
 *
 * @className RestTestHttpConfiguration
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/14 10:19
 */
import {Bean, Configuration, RestDataSource, MapperScan} from "papio-common";
import { IDataSource } from "type-interface";

@Configuration
@MapperScan("@../simple/src/dao/rest-test")
// @MapperScan("@dao/rest-test")
export class RestTestHttpConfiguration {
    @Bean
    public restTestDataSourceMaster(): IDataSource {
        const httpDataSource = new RestDataSource();
        httpDataSource.setName("master");
        httpDataSource.setReadOnly(false);
        httpDataSource.setUrl("http://localhost:3001");
        httpDataSource.build();
        return httpDataSource;
    }
}
