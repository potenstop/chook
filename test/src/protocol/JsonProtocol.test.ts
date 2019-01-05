import { expect } from "chai";
import "reflect-metadata";

import {JsonProperty} from "../../../src/annotation/bean/JsonProperty";
import {Property} from "../../../src/annotation/bean/Property";
import {JsonProtocol} from "../../../src/protocol/JsonProtocol";
import {GenericsProperty} from "../../../src/annotation/bean/GenericsProperty";
import {ApplicationLog} from "../../../src/log/ApplicationLog";
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
    @Property
    public bonus: Bonus<number>;
    @Property
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

class Standard<T> {
    @Property
    public code: number;
    @Property
    public message: string;
    @Property
    @GenericsProperty(0)
    public data: T;
}
class User<T> {
    @JsonProperty("user_id")
    public userId: number;
    @Property
    public userName: T;
}
class UserName {
    @Property
    public name: string;
}
const standard = new Standard<User<UserName>>();
const user = new User<UserName>();
const userName = new UserName();
userName.name = "11";
user.userName = userName;
user.userId = 1;
standard.data = user;
standard.code = 1;
standard.message = "11";

/*const standard1 = new Standard<User[]>();
standard1.data = new Array<User>();
standard1.data.push(user);

standard1.code = 2;
standard1.message = "222";*/

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

    it("response", () => {
        // type a = User[];
        const json = JsonProtocol.toJson(standard, [User]);
        const standard1 = JsonProtocol.jsonToBean(json, Standard, [User]);
        // let standard2 = standard1 as Standard<User<number>>;
        // const json1 = JsonProtocol.toJson(standard1, [Array]);
        // console.info(json, standard1);
    });
});
