import { expect } from "chai";
import {RestConnection} from "../../../../src/data/rest/RestConnection";
import {RestDataSource} from "../../../../src/data/rest/RestDataSource";
import {Property} from "../../../../src/annotation/bean/Property";
import {Standard} from "../../../../src/model/Standard";

class Member {
    @Property
    public id: number;
    @Property
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
