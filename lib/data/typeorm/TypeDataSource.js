"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_pool_1 = require("generic-pool");
const TypeConnection_1 = require("./TypeConnection");
const ApplicationLog_1 = require("../../log/ApplicationLog");
const DatabaseLog_1 = require("../../log/DatabaseLog");
class TypeDataSource {
    constructor() {
        this.kind = "IDataSource";
        this.type = "mysql";
        this.url = "mysql://localhost/test";
        this.readonlyConnection = false;
        this.poolOption = {
            max: 10,
            min: 1,
            idleTimeoutMillis: 100000,
            acquireTimeoutMillis: 2000,
        };
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
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    getPoolOptions() {
        return this.poolOption;
    }
    setPoolOptions(poolOption) {
        this.poolOption = poolOption;
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
    isReadOnly() {
        return this.readonlyConnection;
    }
    setReadOnly(readOnly) {
        this.readonlyConnection = readOnly;
    }
    setEntities(entities) {
        this.entities = entities;
    }
    getEntities() {
        return this.entities;
    }
    build() {
        const op = {};
        if (this.url) {
            const url = new URL(this.url);
            op.type = url.protocol.substring(0, url.protocol.length - 1);
            op.host = url.hostname;
            op.port = url.port;
            op.database = url.pathname.substring(1, url.pathname.length);
            op.username = this.username;
            op.password = this.password;
            op.name = this.name;
            op.entities = this.entities;
            op.logger = new DatabaseLog_1.DatabaseLog();
            url.searchParams.forEach((value, key) => {
                op[key] = value;
            });
        }
        const readOnly = this.isReadOnly();
        this.connectionPool = generic_pool_1.createPool({
            create() {
                return TypeConnection_1.TypeConnection.build(op, readOnly);
            },
            destroy(client) {
                client.getSourceConnection().close();
            }
        }, this.poolOption);
    }
    async getConnection(username, password) {
        try {
            return await this.connectionPool.acquire();
        }
        catch (e) {
            ApplicationLog_1.ApplicationLog.error("pool acquire error", e);
            throw e;
        }
    }
    releaseConnection(con) {
        return this.connectionPool.release(con);
    }
}
exports.TypeDataSource = TypeDataSource;
//# sourceMappingURL=TypeDataSource.js.map