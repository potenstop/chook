"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const CommonConstant_1 = require("../../constants/CommonConstant");
const JsonProtocol_1 = require("../../protocol/JsonProtocol");
const RequestRedisCommand_1 = require("../../enums/RequestRedisCommand");
const GenerateUtil_1 = require("../../util/GenerateUtil");
class RedisConnection {
    constructor(options) {
        this.readonlyConnection = false;
        this.options = options;
    }
    close() {
        return undefined;
    }
    commit(savePoint) {
        return undefined;
    }
    connect() {
        this.sourceConnection = new Redis(this.options);
        this.sourceConnection.defineCommand("unlock", {
            numberOfKeys: 1,
            lua: "if redis.call('exists', KEYS[1]) then " +
                "return redis.call('del', KEYS[1]) " +
                "else " +
                "return 0 " +
                "end"
        });
        this.sourceConnection.on("error", (err) => {
            this.isConnect = false;
            if (this.residueInformCount > 0) { // 只有剩余的通知次数大于0才会通知
                this.residueInformCount--;
            }
        });
        this.sourceConnection.on("connect", () => {
            // 通知次数恢复
            this.residueInformCount = 3;
            this.isConnect = true;
        });
        return undefined;
    }
    isClosed() {
        return !this.isConnect;
    }
    isConnected() {
        return this.isConnect;
    }
    isReadOnly() {
        return this.readonlyConnection;
    }
    rollback(savePoint) {
        return undefined;
    }
    setReadOnly(readOnly) {
        this.readonlyConnection = readOnly;
    }
    setSavepoint(name) {
        return undefined;
    }
    startTransaction(level) {
        return undefined;
    }
    static async build(options, isReadOnly) {
        const connection = new RedisConnection(options);
        connection.setReadOnly(isReadOnly);
        return connection;
    }
    /**
     * 方法功能描述: 执行redis命令
     * @author yanshaowen
     * @date 2019/2/19 8:57
     * @param command   命令名称
     * @param args      命令参数
     * @return
     */
    async execCommand(command, args) {
        // lock(key(必填), expire(必填), sleepMillis(等待时间选填), retryCount(重试次数 选填))
        if (command === RequestRedisCommand_1.RequestRedisCommand.LOCK) {
            if (args.length < 2) {
                throw new Error(`redis command(${RequestRedisCommand_1.RequestRedisCommand.LOCK}) args(${JSON.stringify(args)} length greater than or equal to 2`);
            }
            const v = GenerateUtil_1.GenerateUtil.uuid(10, 20);
            const commandResult = await this.tryCommand("set", [args[0], v, "px", args[1], "nx"], function (val) {
                return val === "OK";
            }, args[2], args[3]);
            return !!commandResult;
        }
        else if (command === RequestRedisCommand_1.RequestRedisCommand.UNLOCK) {
            if (args.length !== 1) {
                throw new Error(`redis command(${RequestRedisCommand_1.RequestRedisCommand.UNLOCK}) args(${JSON.stringify(args)} length not equal to 1`);
            }
            try {
                const unlockResult = await this.sourceConnection.unlock(args[0]);
                return +unlockResult === 1;
            }
            catch (e) {
                const unlockResult = await this.sourceConnection.del(args[0]);
                return +unlockResult === 1;
            }
        }
        if (!this.sourceConnection || typeof this.sourceConnection[command] !== "function") {
            throw new Error(`command(${command}) not found to redis`);
        }
        return this.sourceConnection[command](...args);
    }
    /**
     * 方法功能描述: 执行redis命令 并转换返回值
     * @author yanshaowen
     * @date 2019/2/19 8:57
     * @param command   命令名称
     * @param args      命令参数
     * @param genericsProperty
     * @return
     */
    async execCommandSerialize(command, args, genericsProperty) {
        if (!genericsProperty.has(CommonConstant_1.CommonConstant.GENERICS_ROOT)) {
            throw new Error(`genericsProperty not found key(${CommonConstant_1.CommonConstant.GENERICS_ROOT})`);
        }
        const result = await this.execCommand(command, args);
        return JsonProtocol_1.JsonProtocol.routerToBean(result, genericsProperty);
    }
    /**
     * 方法功能描述: 重复执行某个命令
     * @author yanshaowen
     * @date 2019/2/19 15:14
     * @param command       对应的命令
     * @param args          命令的参数
     * @param func          判断返回值的函数 返回true则返回 否则继续执行
     * @param sleepMillis   每次重试等待的时间
     * @param retryCount    重试的次数
     * @return
     */
    async tryCommand(command, args, func, sleepMillis, retryCount) {
        if (retryCount === undefined || retryCount === null) {
            retryCount = 0;
        }
        if (sleepMillis === undefined || sleepMillis === null) {
            sleepMillis = 0;
            retryCount = 1;
        }
        retryCount = Math.floor(retryCount);
        if (retryCount < 1) {
            retryCount = 1;
        }
        // 先执行一次
        const one = await this.sourceConnection[command](...args);
        if (func(one)) {
            return one;
        }
        else {
            // 开启定时
            let i = 0;
            return new Promise((resolve) => {
                let interval;
                interval = setInterval(async () => {
                    const re = await this.sourceConnection[command](...args);
                    if (i >= retryCount) {
                        resolve(re);
                    }
                    if (func(re)) {
                        clearInterval(interval);
                        resolve(re);
                    }
                    i++;
                }, sleepMillis);
            });
        }
    }
}
exports.RedisConnection = RedisConnection;
//# sourceMappingURL=RedisConnection.js.map