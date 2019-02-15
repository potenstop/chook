"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Agent = require("agentkeepalive");
const RestConnection_1 = require("./RestConnection");
/**
 *
 * 功能描述: http and http dataSource
 *
 * @className RestDataSource
 * @projectName papio
 * @author yanshaowen
 * @date 2019/2/1 13:08
 */
class RestDataSource {
    constructor() {
        this.kind = "IDataSource";
        this.url = "http://localhost:3001";
        this.readonlyConnection = false;
    }
    build() {
        this.agent = new Agent(this.agentConfig);
        const op = {};
        if (this.url) {
            const url = new URL(this.url);
            op.host = url.hostname;
            op.port = url.port;
            op.type = url.protocol.substring(0, url.protocol.length - 1);
        }
        op.username = this.username;
        op.password = this.password;
        op.name = this.name;
        this.buildOption = op;
    }
    async getConnection(username, password) {
        if (this.httpConnection) {
            return this.httpConnection;
        }
        this.httpConnection = await RestConnection_1.RestConnection.build(this.buildOption, this.isReadOnly());
        return this.httpConnection;
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
    getAgentConfig() {
        return this.agentConfig;
    }
    setAgentConfig(agentConfig) {
        this.agentConfig = agentConfig;
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
exports.RestDataSource = RestDataSource;
//# sourceMappingURL=RestDataSource.js.map