import { expect } from "chai";
import {TypeDataSource} from "../../../../src/data/typeorm/TypeDataSource";
import {TypeConnection} from "../../../../src/data/typeorm/TypeConnection";

describe("test", () => {
    it("info", async () => {
        const typeDataSource = new TypeDataSource();
        typeDataSource.setName("mysql-slave2");
        typeDataSource.setReadOnly(true);
        typeDataSource.setUrl("mysql://localhost:3306/common_util");
        typeDataSource.setUsername("common_util_root");
        typeDataSource.setPassword("123456");
        typeDataSource.build();
        const con = await typeDataSource.getConnection() as TypeConnection;
        const con1 = await typeDataSource.getConnection();
    });
});