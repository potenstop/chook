"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * 功能描述: redis 请求命令
 *
 * @className RequestRedisCommand
 * @projectName papio
 * @author yanshaowen
 * @date 2018/12/25 15:53
 */
var RequestRedisCommand;
(function (RequestRedisCommand) {
    RequestRedisCommand["DEL"] = "del";
    RequestRedisCommand["DUMP"] = "dump";
    RequestRedisCommand["EXISTS"] = "exists";
    RequestRedisCommand["EXPIRE"] = "expire";
    RequestRedisCommand["EXPIREAT"] = "expireat";
    RequestRedisCommand["KEYS"] = "keys";
    RequestRedisCommand["MIGRATE"] = "migrate";
    RequestRedisCommand["MOVE"] = "move";
    RequestRedisCommand["OBJECT"] = "object";
    RequestRedisCommand["PERSIST"] = "persist";
    RequestRedisCommand["PEXPIRE"] = "pexpire";
    RequestRedisCommand["PEXPIREAT"] = "pexpireat";
    RequestRedisCommand["PTTL"] = "pttl";
    RequestRedisCommand["RANDOMKEY"] = "randomkey";
    RequestRedisCommand["RENAME"] = "rename";
    RequestRedisCommand["RENAMENX"] = "renamenx";
    RequestRedisCommand["RESTORE"] = "restore";
    RequestRedisCommand["SORT"] = "sort";
    RequestRedisCommand["TTL"] = "ttl";
    RequestRedisCommand["TYPE"] = "type";
    RequestRedisCommand["SCAN"] = "scan";
    RequestRedisCommand["APPEND"] = "append";
    RequestRedisCommand["BITCOUNT"] = "bitcount";
    RequestRedisCommand["BITOP"] = "bitop";
    RequestRedisCommand["DECR"] = "decr";
    RequestRedisCommand["DECRBY"] = "decrby";
    RequestRedisCommand["GET"] = "get";
    RequestRedisCommand["GETBIT"] = "getbit";
    RequestRedisCommand["GETRANGE"] = "getrange";
    RequestRedisCommand["GETSET"] = "getset";
    RequestRedisCommand["INCR"] = "incr";
    RequestRedisCommand["INCRBY"] = "incrby";
    RequestRedisCommand["INCRBYFLOAT"] = "incrbyfloat";
    RequestRedisCommand["MGET"] = "mget";
    RequestRedisCommand["MSET"] = "mset";
    RequestRedisCommand["MSETNX"] = "msetnx";
    RequestRedisCommand["PSETEX"] = "psetex";
    RequestRedisCommand["SET"] = "set";
    RequestRedisCommand["SETBIT"] = "setbit";
    RequestRedisCommand["SETEX"] = "setex";
    RequestRedisCommand["SETNX"] = "setnx";
    RequestRedisCommand["SETRANGE"] = "setrange";
    RequestRedisCommand["STRLEN"] = "strlen";
    RequestRedisCommand["HDEL"] = "hdel";
    RequestRedisCommand["HEXISTS"] = "hexists";
    RequestRedisCommand["HGET"] = "hget";
    RequestRedisCommand["HGETALL"] = "hgetall";
    RequestRedisCommand["HINCRBY"] = "hincrby";
    RequestRedisCommand["HINCRBYFLOAT"] = "hincrbyfloat";
    RequestRedisCommand["HKEYS"] = "hkeys";
    RequestRedisCommand["HLEN"] = "hlen";
    RequestRedisCommand["HMGET"] = "hmget";
    RequestRedisCommand["HMSET"] = "hmset";
    RequestRedisCommand["HSET"] = "hset";
    RequestRedisCommand["HSETNX"] = "hsetnx";
    RequestRedisCommand["HVALS"] = "hvals";
    RequestRedisCommand["HSCAN"] = "hscan";
    RequestRedisCommand["BLPOP"] = "blpop";
    RequestRedisCommand["BRPOP"] = "brpop";
    RequestRedisCommand["BRPOPLPUSH"] = "brpoplpush";
    RequestRedisCommand["LINDEX"] = "lindex";
    RequestRedisCommand["LINSERT"] = "linsert";
    RequestRedisCommand["LLEN"] = "llen";
    RequestRedisCommand["LPOP"] = "lpop";
    RequestRedisCommand["LPUSH"] = "lpush";
    RequestRedisCommand["LPUSHX"] = "lpushx";
    RequestRedisCommand["LRANGE"] = "lrange";
    RequestRedisCommand["LREM"] = "lrem";
    RequestRedisCommand["LSET"] = "lset";
    RequestRedisCommand["LTRIM"] = "ltrim";
    RequestRedisCommand["RPOP"] = "rpop";
    RequestRedisCommand["RPOPLPUSH"] = "rpoplpush";
    RequestRedisCommand["RPUSH"] = "rpush";
    RequestRedisCommand["RPUSHX"] = "rpushx";
    RequestRedisCommand["SADD"] = "sadd";
    RequestRedisCommand["SCARD"] = "scard";
    RequestRedisCommand["SDIFF"] = "sdiff";
    RequestRedisCommand["SDIFFSTORE"] = "sdiffstore";
    RequestRedisCommand["SINTER"] = "sinter";
    RequestRedisCommand["SINTERSTORE"] = "sinterstore";
    RequestRedisCommand["SISMEMBER"] = "sismember";
    RequestRedisCommand["SMEMBERS"] = "smembers";
    RequestRedisCommand["SMOVE"] = "smove";
    RequestRedisCommand["SPOP"] = "spop";
    RequestRedisCommand["SRANDMEMBER"] = "srandmember";
    RequestRedisCommand["SREM"] = "srem";
    RequestRedisCommand["SUNION"] = "sunion";
    RequestRedisCommand["SUNIONSTORE"] = "sunionstore";
    RequestRedisCommand["SSCAN"] = "sscan";
    RequestRedisCommand["ZADD"] = "zadd";
    RequestRedisCommand["ZCARD"] = "zcard";
    RequestRedisCommand["ZCOUNT"] = "zcount";
    RequestRedisCommand["ZINCRBY"] = "zincrby";
    RequestRedisCommand["ZRANGE"] = "zrange";
    RequestRedisCommand["ZRANGEBYSCORE"] = "zrangebyscore";
    RequestRedisCommand["ZRANK"] = "zrank";
    RequestRedisCommand["ZREM"] = "zrem";
    RequestRedisCommand["ZREMRANGEBYRANK"] = "zremrangebyrank";
    RequestRedisCommand["ZREMRANGEBYSCORE"] = "zremrangebyscore";
    RequestRedisCommand["ZREVRANGE"] = "zrevrange";
    RequestRedisCommand["ZREVRANGEBYSCORE"] = "zrevrangebyscore";
    RequestRedisCommand["ZREVRANK"] = "zrevrank";
    RequestRedisCommand["ZSCORE"] = "zscore";
    RequestRedisCommand["ZUNIONSTORE"] = "zunionstore";
    RequestRedisCommand["ZINTERSTORE"] = "zinterstore";
    RequestRedisCommand["ZSCAN"] = "zscan";
    RequestRedisCommand["LOCK"] = "lock";
    RequestRedisCommand["UNLOCK"] = "unlock";
})(RequestRedisCommand = exports.RequestRedisCommand || (exports.RequestRedisCommand = {}));
//# sourceMappingURL=RequestRedisCommand.js.map