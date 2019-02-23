import { expect } from "chai";
import "reflect-metadata";

import {JsonProperty} from "../../../src/annotation/bean/JsonProperty";
import {Property} from "../../../src/annotation/bean/Property";
import {JsonProtocol} from "../../../src/protocol/JsonProtocol";
import {DateTimeConverter} from "../../../src/converter/DateTimeConverter";

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
    @Property
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

const myBeanMap = new Map<string, new () => object>();
myBeanMap.set("MyBean.numbers", Array);
myBeanMap.set("MyBean.numbers.Array", Number);
myBeanMap.set("MyBean.orders", Array);
myBeanMap.set("MyBean.orders.Array", Order);
myBeanMap.set("MyBean.bonus", Bonus);
myBeanMap.set("MyBean.bonus.Bonus.id", Number);
class Standard<T> {
    @Property
    public code: number;
    @Property
    public message: string;
    @Property
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
const standard = new Standard<Array<User<UserName>>>();
const user = new User<UserName>();
const userName = new UserName();
userName.name = "11";
user.userName = userName;
user.userId = 1;
const array = new Array<User<UserName>>();
array.push(user);
array.push(user);
standard.data = array;
standard.code = 1;
standard.message = "11";

/*const standard1 = new Standard<User[]>();
standard1.data = new Array<User>();
standard1.data.push(user);

standard1.code = 2;
standard1.message = "222";*/

describe("测试 JsonProtocol.test", () => {
    it("toJson()", async () => {
        const json = JsonProtocol.toJson(myBean, myBeanMap, "MyBean") as any;
        expect(json.user_info.nick_name).to.equal(myBean.userInfo.nickName);
    });
    it("toJSONString()", async () => {
        const json = JsonProtocol.toJSONString(myBean, myBeanMap, "MyBean");
        expect(json.length > 10).to.equals(true);
    });
    it("jsonToBean()", async () => {
        const json = JsonProtocol.toJson(myBean, myBeanMap, "MyBean");
        const myBean1 = JsonProtocol.jsonToBean(json, MyBean, myBeanMap, "MyBean");
        const myBean2 = JsonProtocol.toJSONString(myBean1, myBeanMap, "MyBean");
        expect(myBean1.inputName).to.equals(myBean.inputName);
    });

    it("response", () => {
        // type a = User[];
        const map = new Map<string, new () => object>();
        map.set("Standard.data", Array);
        map.set("Standard.data.Array", User);
        map.set("Standard.data.Array.User.userName", UserName);
        const json = JsonProtocol.toJson(standard, map, "Standard");
        const standard1 = JsonProtocol.jsonToBean(json, Standard, map, "Standard");
        // let standard2 = standard1 as Standard<User<number>>;
        // const json1 = JsonProtocol.toJson(standard1, [Array]);
        // console.info(json, standard1);
    });
    it("copy", () => {
        class Source {
            @Property
            public id: number;
            @Property
            public createTime: Date;
        }
        class Target {
            @Property
            public id: number;
            @Property
            public createTime: string;
        }
        const source = new Source();
        const target = new Target();
        source.id = 1;
        source.createTime = new Date("2019-02-23 11:11:11");
        const s1 = [source];
        const iConv = [new DateTimeConverter(["createTime"], Date)];
        JsonProtocol.copyProperties(source , target, iConv);
        expect(target.id).to.equal(1);
        expect(target.createTime).to.equal("2019-02-23 11:11:11");
    });
});
