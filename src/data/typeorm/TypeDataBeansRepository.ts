import {
    AbstractRepository,
    DeepPartial, DeleteResult, EntityManager, EntityMetadata,
    FindConditions, FindManyOptions,
    FindOneOptions, getMetadataArgsStorage, InsertResult, ObjectID, ObjectLiteral,
    QueryRunner, RemoveOptions,
    Repository,
    SaveOptions,
    SelectQueryBuilder, UpdateResult,
} from "typeorm";
import {IDataBean} from "../IDataBean";
import {TypeConnection} from "./TypeConnection";
import {Mappers} from "../../core/Mappers";
import "reflect-metadata";
import {MetaConstant} from "../../constants/MetaConstant";
import {Beans} from "../../core/Beans";
import * as path from "path";
import {FileUtil} from "../../util/FileUtil";
import {IDataSource} from "../IDataSource";
import {TypeDataSource} from "./TypeDataSource";
import {QueryPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {ServerError} from "../../error/ServerError";
import {ApplicationLog} from "../../log/ApplicationLog";

/**
 *
 * 功能描述: 注入连接数据源
 *
 * @className TypeDataBeansRepository
 * @projectName chook
 * @author yanshaowen
 * @date 2019/1/22 16:58
 */

export class TypeDataBeansRepository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    public kind: "IDataBean" = "IDataBean";
    private beanKeys: Set<string>;
    private writeDataSources: IDataSource[];
    private readDataSources: IDataSource[];
    private queryRunner?: QueryRunner;
    private target: Function | string;

    constructor(dir: string) {
        super();
        this.beanKeys = new Set<string>();
        // 获取对应的DataSource
        const strings = FileUtil.findParents(dir);
        let mapperTarget = null;
        for (const str of strings) {
            mapperTarget = Mappers.getMapper(path.join(str));
            if (mapperTarget) {
                break;
            }
        }
        if (mapperTarget) {
            this.beanKeys = Reflect.getOwnMetadata(MetaConstant.BEANS, mapperTarget.prototype) || new Set<string>();
        }
        this.readDataSources = [];
        this.writeDataSources = [];
        this.beanKeys.forEach((key) => {
            const bean = Beans.getBean(key) as any;
            if (bean.kind) {
                if (bean.kind.split(" ").indexOf("IDataSource") !== -1) {
                    let isReadOnly = false;
                    if (bean instanceof TypeDataSource) {
                        isReadOnly = bean.isReadOnly();
                    }
                    if (isReadOnly) {this.readDataSources.push(bean); } else {this.writeDataSources.push(bean); }
                }
            }
        });
        // 初始化target
        const entityRepositoryMetadataArgs = getMetadataArgsStorage().entityRepositories.find((repository) => {
            return repository.target === (this instanceof Function ? this : (this as any).constructor);
        });
        if (entityRepositoryMetadataArgs) {
            this.target = entityRepositoryMetadataArgs.target;
        }
    }

    private async getManager(readOnly?: boolean): Promise<EntityManager> {
        if (readOnly === null || readOnly === undefined) {readOnly = false; }
        let dataList: IDataSource[] = [];
        if (readOnly) {
            dataList = this.readDataSources;
            if (dataList.length === 0) {
                dataList = this.writeDataSources;
            }
        } else {
            dataList = this.writeDataSources;
        }
        if (dataList.length === 0) {
            throw new ServerError("dataSource is empty");
        }
        const i = Math.floor((Math.random() * dataList.length));
        const dataSource = dataList[i];
        const typeConnection = await dataSource.getConnection() as TypeConnection;
        return typeConnection.getSourceConnection().manager;
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
    public async preload(entityLike: DeepPartial<Entity>): Promise<Entity|undefined> {
        const manager = await this.getManager();
        return manager.preload(this.target, entityLike);
    }

    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    public save<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>;
    public save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<Array<T & Entity>>;

    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     */
    public save<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>;
    public save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>;

    /**
     * Saves one or many given entities.
     */
    public async save<T extends DeepPartial<Entity>>(entityOrEntities: T|T[], options?: SaveOptions): Promise<T|T[]> {
        const manager = await this.getManager();
        return manager.save(this.target, entityOrEntities as any, options);
    }

    /**
     * Removes a given entities from the database.
     */
    public remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;

    /**
     * Removes a given entity from the database.
     */
    public remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;

    /**
     * Removes one or many given entities.
     */
    public async remove(entityOrEntities: Entity|Entity[], options?: RemoveOptions): Promise<Entity|Entity[]> {
        const manager = await this.getManager();
        return manager.remove(this.target, entityOrEntities as any, options);
    }

    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     */
    public async insert(entity: QueryPartialEntity<Entity>|(Array<QueryPartialEntity<Entity>>), options?: SaveOptions): Promise<InsertResult> {
        const manager = await this.getManager();
        return manager.insert(this.target, entity, options);
    }

    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
    public async update(criteria: string|string[]|number|number[]|Date|Date[]|ObjectID|ObjectID[]|FindConditions<Entity>, partialEntity: DeepPartial<Entity>, options?: SaveOptions): Promise<UpdateResult> {
        const manager = await this.getManager(true);
        return manager.update(this.target, criteria, partialEntity, options);
    }

    /**
     * Deletes entities by a given criteria.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
    public async delete(criteria: string|string[]|number|number[]|Date|Date[]|ObjectID|ObjectID[]|FindConditions<Entity>, options?: RemoveOptions): Promise<DeleteResult> {
        const manager = await this.getManager();
        return manager.delete(this.target, criteria, options);
    }

    /**
     * Counts entities that match given options.
     */
    public count(options?: FindManyOptions<Entity>): Promise<number>;

    /**
     * Counts entities that match given conditions.
     */
    public count(conditions?: FindConditions<Entity>): Promise<number>;

    /**
     * Counts entities that match given find options or conditions.
     */
    public async count(optionsOrConditions?: FindManyOptions<Entity>|FindConditions<Entity>): Promise<number> {
        const manager = await this.getManager(true);
        return manager.count(this.target, optionsOrConditions);
    }

    /**
     * Finds entities that match given options.
     */
    public find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

    /**
     * Finds entities that match given conditions.
     */
    public find(conditions?: FindConditions<Entity>): Promise<Entity[]>;

    /**
     * Finds entities that match given find options or conditions.
     */
    public async find(optionsOrConditions?: FindManyOptions<Entity>|FindConditions<Entity>): Promise<Entity[]> {
        const manager = await this.getManager(true);
        return manager.find(this.target, optionsOrConditions);
    }

    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    public findAndCount(options?: FindManyOptions<Entity>): Promise<[ Entity[], number ]>;

    /**
     * Finds entities that match given conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    public findAndCount(conditions?: FindConditions<Entity>): Promise<[ Entity[], number ]>;

    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    public async findAndCount(optionsOrConditions?: FindManyOptions<Entity>|FindConditions<Entity>): Promise<[ Entity[], number ]> {
        const manager = await this.getManager(true);
        return manager.findAndCount(this.target, optionsOrConditions);
    }

    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     */
    public findByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;

    /**
     * Finds entities by ids.
     * Optionally conditions can be applied.
     */
    public findByIds(ids: any[], conditions?: FindConditions<Entity>): Promise<Entity[]>;

    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     */
    public async findByIds(ids: any[], optionsOrConditions?: FindManyOptions<Entity>|FindConditions<Entity>): Promise<Entity[]> {
        const manager = await this.getManager(true);
        return manager.findByIds(this.target, ids, optionsOrConditions);
    }
    /**
     * Finds first entity that matches given conditions.
     */
    public async findOne(optionsOrConditions: string|number|Date|ObjectID|FindConditions<Entity>, maybeOptions?: FindOneOptions<Entity>): Promise<Entity|undefined> {
        const manager = await this.getManager(true);
        // @ts-ignore
        return manager.findOne(this.target, optionsOrConditions, maybeOptions);
    }
    /**
     * Finds first entity that matches given conditions.
     */
    public async findOneOrFail(optionsOrConditions: string|number|Date|ObjectID|FindConditions<Entity>, maybeOptions?: FindOneOptions<Entity>): Promise<Entity> {
        const manager = await this.getManager(true);
        // @ts-ignore
        return manager.findOneOrFail(this.target, optionsOrConditions, maybeOptions);
    }

    /**
     * Executes a raw SQL query and returns a raw database results.
     * Raw query execution is supported only by relational databases (MongoDB is not supported).
     */
    public async query(query: string, parameters?: any[]): Promise<any> {
        const manager = await this.getManager(true);
        return manager.query(query, parameters);
    }

    /**
     * Clears all the data from the given table/collection (truncates/drops it).
     *
     * Note: this method uses TRUNCATE and may not work as you expect in transactions on some platforms.
     * @see https://stackoverflow.com/a/5972738/925151
     */
    public async clear(): Promise<void> {
        const manager = await this.getManager();
        return manager.clear(this.target);
    }

    /**
     * Increments some column by provided value of the entities matched given conditions.
     */
    public async increment(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult> {
        const manager = await this.getManager();
        return manager.increment(this.target, conditions, propertyPath, value);
    }

    /**
     * Decrements some column by provided value of the entities matched given conditions.
     */
    public async decrement(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult> {
        const manager = await this.getManager();
        return manager.decrement(this.target, conditions, propertyPath, value);
    }

}
