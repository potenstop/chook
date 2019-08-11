import { expect } from "chai";
import {Standard} from "../../../../src/model/Standard";
import {JsonProperty, RestConnection, RestDataSource} from "../../../../src/papio";

class Member {
    @JsonProperty
    public id: number;
    @JsonProperty
    public name: string;
}
describe("http request", () => {
    it("return member", async () => {
        const httpDataSource = new RestDataSource();
        httpDataSource.setName("mysql-slave2");
        httpDataSource.setReadOnly(true);
        httpDataSource.setUrl("http://localhost:3001");
        httpDataSource.build();
        const connection = await httpDataSource.getConnection() as RestConnection;
        const standard = await connection.request(Standard, new Map<string, new() => object>().set("Standard.data", Member),  "/my/member/info");
        console.log(standard);
    });
});
