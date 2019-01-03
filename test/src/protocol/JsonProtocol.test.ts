import { expect } from "chai";
import "reflect-metadata";

import {JsonProperty} from "../../../src/annotation/bean/JsonProperty";
import {Property} from "../../../src/annotation/bean/Property";
import {JsonProtocol} from "../../../src/protocol/JsonProtocol";
class UserInfo {
    @JsonProperty("nick_name")
    public nickName: string;
}
class Order {
    @JsonProperty("order_id")
    public orderId: number;
}
class Bonus<T> {
    @Property
    public id: T;
}
class MyBean {
    @Property
    public inputName: string;
    @JsonProperty("id")
    public id: number;
    @Property
    public sex: string;
    @JsonProperty("user_info")
    public userInfo: UserInfo;
    @JsonProperty("order_ids")
    @Property(Order)
    public orders: Order[];
    @JsonProperty("aaaaaaaaaaa")
    @Property(Number)
    public bonus: Bonus<number>;
    @Property(Number)
    public numbers: number[];
}
const myBean = new MyBean();
myBean.inputName = "chook";
myBean.sex = "女";
const userInfo = new UserInfo();
userInfo.nickName = "yanshaowen";
myBean.userInfo = userInfo;
const orders = new Array<Order>();
const order1 = new Order();
order1.orderId = 1;

const order2 = new Order();
order2.orderId = 2;
orders.push(order1);
orders.push(order2);
myBean.orders = orders;
const bonus = new Bonus<number>();
bonus.id = 1;
myBean.bonus = bonus;
myBean.numbers = [];
myBean.numbers.push(1);
myBean.numbers.push(2);
describe("测试 JsonProtocol.test", () => {
    it("toJson()", async () => {
        const json = JsonProtocol.toJson(myBean) as any;
        expect(json.input_name).to.equal(myBean.inputName);
    });
    it("toJSONString()", async () => {
        const json = JsonProtocol.toJSONString(myBean);
        expect(json.length > 10).to.equals(true);
    });
    it("jsonToBean()", async () => {
        const json = JsonProtocol.toJson(myBean);
        const myBean1 = JsonProtocol.jsonToBean(json, MyBean);
        const myBean2 = JsonProtocol.toJSONString(myBean1);
        expect(myBean1.inputName).to.equals(myBean.inputName);
    });
});
