"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Mappers_1 = require("../../core/Mappers");
require("reflect-metadata");
const MetaConstant_1 = require("../../constants/MetaConstant");
const Beans_1 = require("../../core/Beans");
const path = require("path");
const FileUtil_1 = require("../../util/FileUtil");
const TypeDataSource_1 = require("./TypeDataSource");
const ServerError_1 = require("../../error/ServerError");
const ApplicationLog_1 = require("../../log/ApplicationLog");
require("reflect-metadata");
const StackAnalysisUtil_1 = require("../../util/StackAnalysisUtil");
/**
 *
 * 功能描述: 注入连接数据源
 *
 * @className TypeDataBeansRepository
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 16:58
 */
class TypeDataBeansRepository extends typeorm_1.AbstractRepository {
    constructor(dir) {
        super();
        this.kind = "IDataBean";
        this.beanKeys = new Set();
        // 获取对应的DataSource
        const strings = FileUtil_1.FileUtil.findParents(dir);
        let mapperTarget = null;
        for (const str of strings) {
            mapperTarget = Mappers_1.Mappers.getMapper(path.join(str));
            if (mapperTarget) {
                break;
            }
        }
        if (mapperTarget) {
            this.beanKeys = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.BEANS, mapperTarget.prototype) || new Set();
        }
        this.readDataSources = [];
        this.writeDataSources = [];
        this.beanKeys.forEach((key) => {
            const bean = Beans_1.Beans.getBean(key);
            if (bean.kind) {
                if (bean.kind.split(" ").indexOf("IDataSource") !== -1) {
                    let isReadOnly = false;
                    if (bean instanceof TypeDataSource_1.TypeDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {
                        this.readDataSources.push(bean);
                    }
                    else {
                        this.writeDataSources.push(bean);
                    }
                }
            }
        });
        // 初始化target
        const entityRepositoryMetadataArgs = typeorm_1.getMetadataArgsStorage().entityRepositories.find((repository) => {
            return repository.target === (this instanceof Function ? this : this.constructor);
        });
        if (entityRepositoryMetadataArgs) {
            this.target = entityRepositoryMetadataArgs.entity;
        }
    }
    async getManager(readOnly) {
        let propertyKey = null;
        if (this[MetaConstant_1.MetaConstant.TRIGGER] && this[MetaConstant_1.MetaConstant.TRIGGER].constructor) {
            const stackTypes = StackAnalysisUtil_1.StackAnalysisUtil.parseStackAll(new Error().stack);
            for (const stack of stackTypes) {
                if (stack.className === this[MetaConstant_1.MetaConstant.TRIGGER].constructor.name) {
                    propertyKey = stack.methodName;
                    break;
                }
            }
        }
        if (propertyKey) {
            let dataSourceName = "type";
            if (this.writeDataSources.length > 0) {
                dataSourceName = this.writeDataSources[0].getName();
            }
            const transactionMetadata = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.TRANSACTION, this[MetaConstant_1.MetaConstant.TRIGGER].constructor.prototype, propertyKey);
            if (transactionMetadata) {
                const map = this[MetaConstant_1.MetaConstant.TRIGGER][MetaConstant_1.MetaConstant.TRANSACTION_OBJECT];
                if (map && map.has(propertyKey)) {
                    // 已经启动了事务
                    if (map.get(propertyKey).transactions && map.get(propertyKey).transactions.has(dataSourceName)) {
                        return map.get(propertyKey).transactions.get(dataSourceName);
                    }
                    else {
                        const connectionManager = await this.getConnectionByDataSource(false);
                        const re = connectionManager.release;
                        connectionManager.release = function () { };
                        const savepoint = await connectionManager.connection.startTransaction(transactionMetadata.level);
                        map.get(propertyKey).transactions = new Map();
                        map.get(propertyKey).transactions.set(dataSourceName, connectionManager);
                        map.get(propertyKey).commits.push(function () {
                            connectionManager.connection.commit(savepoint);
                        });
                        map.get(propertyKey).rollbacks.push(function () {
                            connectionManager.connection.rollback(savepoint);
                        });
                        map.get(propertyKey).releases.push(re);
                        return connectionManager;
                    }
                }
            }
            const triggerMetadata = Reflect.getOwnMetadata(MetaConstant_1.MetaConstant.PRIMARY, this[MetaConstant_1.MetaConstant.TRIGGER].constructor.prototype, propertyKey);
            if (triggerMetadata) {
                readOnly = false;
            }
        }
        return this.getConnectionByDataSource(readOnly);
    }
    /**
     * 方法描述 从datasource中获取manager
     * @author yanshaowen
     * @date 2019/1/27 21:13
     * @param readOnly   是否为只读   默认为false
     * @return Promise<IConnectionPool>
     */
    async getConnectionByDataSource(readOnly) {
        if (readOnly === null || readOnly === undefined) {
            readOnly = false;
        }
        let dataList = [];
        if (readOnly) {
            dataList = this.readDataSources;
            if (dataList.length === 0) {
                dataList = this.writeDataSources;
            }
        }
        else {
            dataList = this.writeDataSources;
        }
        if (dataList.length === 0) {
            throw new ServerError_1.ServerError("dataSource is empty");
        }
        const i = Math.floor((Math.random() * dataList.length));
        const dataSource = dataList[i];
        const typeConnection = await dataSource.getConnection();
        return { connection: typeConnection, release: () => {
                dataSource.releaseConnection(typeConnection).catch((e) => {
                    ApplicationLog_1.ApplicationLog.error("pool release error", e);
                });
            } };
    }
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     *
     * Note that given entity-like object must have an entity id / primary key to find entity by.
     * Returns undefined if entity with given id was not found.
     */
    async preload(entityLike) {
        const { connection, release } = await this.getManager();
        const result = await connection.getSourceConnection().manager.preload(this.target, entityLike);
        release();
        return result;
    }
    /**
     * Saves one or many given entities.
     */
    async save(entityOrEntities, options) {
        const { connection, release } = await this.getManager(false);
        if (!options) {
            options = {};
            options.transaction = false;
        }
        const result = await connection.getSourceConnection().manager.save(this.target, entityOrEntities, options);
        release();
        return result;
    }
    /**
     * Removes one or many given entities.
     */
    async remove(entityOrEntities, options) {
        const { connection, release } = await this.getManager();
        if (!options) {
            options = {};
            options.transaction = false;
        }
        const result = await connection.getSourceConnection().manager.remove(this.target, entityOrEntities, options);
        release();
        return result;
    }
    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     */
    async insert(entity, options) {
        const { connection, release } = await this.getManager();
        if (!options) {
            options = {};
            options.transaction = false;
        }
        const result = await connection.getSourceConnection().manager.insert(this.target, entity, options);
        release();
        return result;
    }
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
    async update(criteria, partialEntity, options) {
        const { connection, release } = await this.getManager();
        if (!options) {
            options = {};
            options.transaction = false;
        }
        const result = await connection.getSourceConnection().manager.update(this.target, criteria, partialEntity, options);
        release();
        return result;
    }
    /**
     * Deletes entities by a given criteria.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
    async delete(criteria, options) {
        const { connection, release } = await this.getManager();
        const result = await connection.getSourceConnection().manager.delete(this.target, criteria, options);
        release();
        return result;
    }
    /**
     * Counts entities that match given find options or conditions.
     */
    async count(optionsOrConditions) {
        const { connection, release } = await this.getManager(true);
        const result = await connection.getSourceConnection().manager.count(this.target, optionsOrConditions);
        release();
        return result;
    }
    /**
     * Finds entities that match given find options or conditions.
     */
    async find(optionsOrConditions) {
        const { connection, release } = await this.getManager(true);
        const result = await connection.getSourceConnection().manager.find(this.target, optionsOrConditions);
        release();
        return result;
    }
    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    async findAndCount(optionsOrConditions) {
        const { connection, release } = await this.getManager(true);
        const result = await connection.getSourceConnection().manager.findAndCount(this.target, optionsOrConditions);
        release();
        return result;
    }
    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     */
    async findByIds(ids, optionsOrConditions) {
        const { connection, release } = await this.getManager(true);
        const result = await connection.getSourceConnection().manager.findByIds(this.target, ids, optionsOrConditions);
        release();
        return result;
    }
    /**
     * Finds first entity that matches given conditions.
     */
    async findOne(optionsOrConditions, maybeOptions) {
        const { connection, release } = await this.getManager(true);
        // @ts-ignore
        const result = await connection.getSourceConnection().manager.findOne(this.target, optionsOrConditions, maybeOptions);
        release();
        return result;
    }
    /**
     * Finds first entity that matches given conditions.
     */
    async findOneOrFail(optionsOrConditions, maybeOptions) {
        const { connection, release } = await this.getManager(true);
        // @ts-ignore
        const result = await connection.getSourceConnection().manager.findOneOrFail(this.target, optionsOrConditions, maybeOptions);
        release();
        return result;
    }
    /**
     * Executes a raw SQL query and returns a raw database results.
     * Raw query execution is supported only by relational databases (MongoDB is not supported).
     */
    async query(query, parameters) {
        const { connection, release } = await this.getManager(false);
        const result = await connection.getSourceConnection().manager.query(query, parameters);
        release();
        return result;
    }
    /**
     * Increments some column by provided value of the entities matched given conditions.
     */
    async increment(conditions, propertyPath, value) {
        const { connection, release } = await this.getManager();
        const result = await connection.getSourceConnection().manager.increment(this.target, conditions, propertyPath, value);
        release();
        return result;
    }
    /**
     * Decrements some column by provided value of the entities matched given conditions.
     */
    async decrement(conditions, propertyPath, value) {
        const { connection, release } = await this.getManager();
        const result = await connection.getSourceConnection().manager.decrement(this.target, conditions, propertyPath, value);
        release();
        return result;
    }
}
exports.TypeDataBeansRepository = TypeDataBeansRepository;
//# sourceMappingURL=TypeDataBeansRepository.js.map