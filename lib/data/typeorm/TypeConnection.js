"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const CommonSavepoint_1 = require("../CommonSavepoint");
const GenerateUtil_1 = require("../../util/GenerateUtil");
const ApplicationLog_1 = require("../../log/ApplicationLog");
let isFirst = true;
class TypeConnection {
    constructor(options) {
        this.kind = "IConnection";
        this.transactions = new Map();
        this.readonlyConnection = false;
        if (isFirst) {
            options.name = "default";
            isFirst = false;
        }
        else {
            options.name = GenerateUtil_1.GenerateUtil.uuid(8, 20);
        }
        this.options = options;
    }
    async connect() {
        try {
            this.connection = await typeorm_1.createConnection(this.options);
        }
        catch (e) {
            ApplicationLog_1.ApplicationLog.error("connect error", e);
            this.connection = null;
        }
    }
    isClosed() {
        if (!this.connection) {
            return true;
        }
        return !this.connection.isConnected;
    }
    close() {
        if (this.connection) {
            return this.connection.close();
        }
    }
    getSourceConnection() {
        return this.connection;
    }
    async commit(savePoint) {
        if (!this.connection) {
            throw new Error("connection is error");
        }
        const queryRunner = this.transactions.get(savePoint.getSavepointName());
        if (queryRunner) {
            try {
                await queryRunner.commitTransaction();
                this.transactions.delete(savePoint.getSavepointName());
            }
            catch (e) {
                throw e;
            }
        }
    }
    async rollback(savePoint) {
        if (!this.connection) {
            throw new Error("connection is error");
        }
        const queryRunner = this.transactions.get(savePoint.getSavepointName());
        if (queryRunner) {
            this.transactions.delete(savePoint.getSavepointName());
            await queryRunner.rollbackTransaction();
        }
    }
    isConnected() {
        if (!this.connection) {
            return false;
        }
        return this.connection.isConnected;
    }
    isReadOnly() {
        return this.readonlyConnection;
    }
    setReadOnly(readOnly) {
        this.readonlyConnection = readOnly;
    }
    setSavepoint(name) {
        if (this.connection && !this.isReadOnly()) {
            const commonSavepoint = new CommonSavepoint_1.CommonSavepoint(name);
            commonSavepoint.getSavepointName();
            return commonSavepoint;
        }
        return null;
    }
    async startTransaction(level) {
        if (!this.connection) {
            throw new Error("connection is error");
        }
        const queryRunner = this.connection.createQueryRunner("master");
        await queryRunner.startTransaction(level);
        const savepoint = this.setSavepoint();
        this.transactions.set(savepoint.getSavepointName(), queryRunner);
        return savepoint;
    }
    static async build(options, isReadOnly) {
        const typeConnection = new TypeConnection(options);
        typeConnection.setReadOnly(isReadOnly);
        await typeConnection.connect();
        return typeConnection;
    }
}
exports.TypeConnection = TypeConnection;
//# sourceMappingURL=TypeConnection.js.map