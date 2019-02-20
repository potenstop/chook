"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedisConnection_1 = require("./RedisConnection");
/**
 *
 * 功能描述: redis数据源
 *
 * @className RedisDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/17 11:10
 */
class RedisDataSource {
    constructor() {
        this.kind = "IDataSource";
        this.url = "http://localhost:3001";
        this.readonlyConnection = false;
    }
    build() {
        const op = {};
        if (this.url) {
            const url = new URL(this.url);
            op.host = url.hostname;
            op.port = url.port;
            op.type = url.protocol.substring(0, url.protocol.length - 1);
            op.db = +url.pathname.substring(1, url.pathname.length);
        }
        op.username = this.username;
        op.password = this.password;
        op.name = this.name;
        this.buildOption = op;
    }
    async getConnection(username, password) {
        if (this.redisConnection) {
            return this.redisConnection;
        }
        this.redisConnection = await RedisConnection_1.RedisConnection.build(this.buildOption, this.isReadOnly());
        await this.redisConnection.connect();
        return this.redisConnection;
    }
    getLogWriter() {
        return this.logWriter;
    }
    getLoginTimeout() {
        return this.loginTimeout;
    }
    setLogWriter(printWrite) {
        this.logWriter = printWrite;
    }
    setLoginTimeout(seconds) {
        this.loginTimeout = seconds;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    isReadOnly() {
        return this.readonlyConnection;
    }
    setReadOnly(readOnly) {
        this.readonlyConnection = readOnly;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
}
exports.RedisDataSource = RedisDataSource;
//# sourceMappingURL=RedisDataSource.js.map