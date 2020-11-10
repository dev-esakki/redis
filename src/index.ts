import "reflect-metadata";
import {createConnection} from "typeorm";
import RedisHelper from "./redis-server";

createConnection().then(async () => {
    const redisServer = new RedisHelper()
    /* strings */
    const append = await redisServer.append("test1", "welcome") //7 str length
    const set = await redisServer.set("test2", "1") //OK
    const setnx = await redisServer.setnx("test3", "appan") //1 or 0
    const strlen = await redisServer.strlen("test1") //8 string length
    const mset = await redisServer.mset([{key: "test4", value: "react"}]) //OK
    const msetnx = await redisServer.msetnx("test5", "test5") //1 or 0
    const get = await redisServer.get("test5") //value or null
    const getRange = await redisServer.getRange("test5", 10, 20) //value or ""
    const mget = await redisServer.mget(["test5","test1" ]) //[values] or [null, null]
    const incr = await redisServer.incr("test6") //incremented number
    const incrby = await redisServer.incrby("test7", 10) //incremented number
    const incrbyFloat = await redisServer.incrbyFloat("test8", 10.25) //incremented number
    const decr = await redisServer.decr("test9") //decremented number
    const decrby = await redisServer.decrby("test10", 5) //decremented number
    const del = await redisServer.del("test1") //1 or 0
    const expire = await redisServer.del("test11") //1 or 0
    const ttl = await redisServer.ttl("test11") //1 or 0
    /* sets */
    const rpush = await redisServer.rpush("test12", JSON.stringify({"key": "esakki"})) //incremented count
    const rpushx = await redisServer.rpushx("test12", JSON.stringify({"key": "appan"})) //incremented count
    const lpush = await redisServer.lpush("test12", JSON.stringify({"key": "react"})) //incremented count
    const lrange = await redisServer.lrange("test12",0, 2) //list range result or null
    const lindex = await redisServer.lindex("test12",0) //list result or null
    const linsert = await redisServer.linsert("test12", "BEFORE", JSON.stringify({"key": "esakki"}), JSON.stringify({"key": "node"})) //list length
    const llen = await redisServer.llen("test12") //list result length
    const lpop = await redisServer.lpop("test12") //deleted result
    const lset = await redisServer.lset("test12", 0, JSON.stringify({"key": "fullstack"})) //OK
    const ltrim = await redisServer.ltrim("test12", 1,2) //OK
    const rpop = await redisServer.rpop("test12") //deleted result
    const rpoplpush = await redisServer.rpoplpush("test12", "test13") //result
    /* sets */
    const sadd = await redisServer.sadd("test14", "science", JSON.stringify({"key": "compter"})) //count
    const smembers = await redisServer.smembers("test14") //result [data, key]
    const scard = await redisServer.scard("test14") //1,2 increment count
    const srem = await redisServer.srem("test14", "science", JSON.stringify({"key": "compter"})) //1

    const sadd1 = await redisServer.sadd("test15", "maths", "m1") //count
    const sadd2 = await redisServer.sadd("test15", "maths", "m2") //count
    const srem3 = await redisServer.srem("test15", "maths","m1") //1

    /* union */
    const union1 = await redisServer.sadd("test16", "eng", "m1") //count
    const union2 = await redisServer.sadd("test16", "eng", "m2") //count
    const union3 = await redisServer.sadd("test16", "eng", "m3") //count

    const union11 = await redisServer.sadd("test17", "history", "m1") //count
    const union22 = await redisServer.sadd("test17", "history", "h2") //count
    const union33 = await redisServer.sadd("test17", "history", "h3") //count
    const union = await redisServer.sunion(["eng", "history"]) //count
    const inter = await redisServer.sinter(["eng", "history"]) //count

    /* hash */
    const hset = await redisServer.hset("devel", "node", "express") //0 or 1
    const hsetnx = await redisServer.hsetnx("devel", "js", "koa") //0 or 1
    const hmset = await redisServer.hmset("user", "market", JSON.stringify({user: "esakki"})) //OK
    const hget = await redisServer.hget("user", "market") //result
    const hgetall = await redisServer.hgetall("user") //result as object or null
    const hexists = await redisServer.hexists("user", "market") //1 or 0
    const hkeys = await redisServer.hkeys("user") //[list of hashes]
    const hlen = await redisServer.hlen("user") //count
    const hvals = await redisServer.hvals("user") //result
    const hdel = await redisServer.hdel("user", "market") //1

    console.log("get", hvals) //seconds
    console.log("server started")

}).catch(error => console.log(error));
