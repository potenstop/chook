import { AbstractRepository, DeepPartial, DeleteResult, FindConditions, FindManyOptions, FindOneOptions, InsertResult, ObjectID, ObjectLiteral, RemoveOptions, SaveOptions, UpdateResult } from "typeorm";
import "reflect-metadata";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import "reflect-metadata";
/**
 *
 * 功能描述: 注入连接数据源
 *
 * @className TypeDataBeansRepository
 * @projectName papio
 * @author yanshaowen
 * @date 2019/1/22 16:58
 */
export declare class TypeDataBeansRepository<Entity extends ObjectLiteral> extends AbstractRepository<Entity> {
    kind: "IDataBean";
    private beanKeys;
    private writeDataSources;
    private readDataSources;
    private queryRunner?;
    private target;
    constructor(dir: string);
    private getManager;
    /**
     * 方法描述 从datasource中获取manager
     * @author yanshaowen
     * @date 2019/1/27 21:13
     * @param readOnly   是否为只读   默认为false
     * @return Promise<IConnectionPool>
     */
    private getConnectionByDataSource;
    /**
     * Creates a new entity from the given plan javascript object. If entity already exist in the database, then
     * it loads it (and everything related to it), replaces all values with the new ones from the given object
     * and returns this new entity. This new entity is actually a loaded from the db entity with all properties
     * replaced from the new object.
     *
     * Note that given entity-like object must have an entity id / primary key to find entity by.
     * Returns undefined if entity with given id was not found.
     */
    preload(entityLike: DeepPartial<Entity>): Promise<Entity | undefined>;
    /**
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<T extends Entity>(entities: T[], options: SaveOptions & {
        reload: false;
    }): Promise<T[]>;
    save<T extends Entity>(entities: T[], options?: SaveOptions): Promise<Array<T & Entity>>;
    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     */
    save<T extends Entity>(entity: T, options: SaveOptions & {
        reload: false;
    }): Promise<T>;
    save<T extends Entity>(entity: T, options?: SaveOptions): Promise<T & Entity>;
    /**
     * Removes a given entities from the database.
     */
    remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;
    /**
     * Removes a given entity from the database.
     */
    remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;
    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     */
    insert(entity: QueryPartialEntity<Entity> | (Array<QueryPartialEntity<Entity>>), options?: SaveOptions): Promise<InsertResult>;
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
    update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>, partialEntity: DeepPartial<Entity>, options?: SaveOptions): Promise<UpdateResult>;
    /**
     * Deletes entities by a given criteria.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
    delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>, options?: RemoveOptions): Promise<DeleteResult>;
    /**
     * Counts entities that match given options.
     */
    count(options?: FindManyOptions<Entity>): Promise<number>;
    /**
     * Counts entities that match given conditions.
     */
    count(conditions?: FindConditions<Entity>): Promise<number>;
    /**
     * Finds entities that match given options.
     */
    find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given conditions.
     */
    find(conditions?: FindConditions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount(conditions?: FindConditions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     */
    findByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;
    /**
     * Finds entities by ids.
     * Optionally conditions can be applied.
     */
    findByIds(ids: any[], conditions?: FindConditions<Entity>): Promise<Entity[]>;
    /**
     * Finds first entity that matches given conditions.
     */
    findOne(optionsOrConditions: string | number | Date | ObjectID | FindConditions<Entity>, maybeOptions?: FindOneOptions<Entity>): Promise<Entity | undefined>;
    /**
     * Finds first entity that matches given conditions.
     */
    findOneOrFail(optionsOrConditions: string | number | Date | ObjectID | FindConditions<Entity>, maybeOptions?: FindOneOptions<Entity>): Promise<Entity>;
    /**
     * Executes a raw SQL query and returns a raw database results.
     * Raw query execution is supported only by relational databases (MongoDB is not supported).
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Increments some column by provided value of the entities matched given conditions.
     */
    increment(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult>;
    /**
     * Decrements some column by provided value of the entities matched given conditions.
     */
    decrement(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult>;
}
