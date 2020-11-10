
/**
 * redis helper class
 */
export interface IRedisHelper {
    append(rKey: string, rValue: string): Promise<any>
    set(rKey: string, rValue: string): Promise<any>
    setnx(rKey: string, rValue: string): Promise<any>
    strlen(rKey: string): Promise<any>
    mset(data: Array<Imset>): Promise<boolean>
    msetnx(rKey: string, rValue: string): Promise<boolean>
    get(rKey: string): Promise<any>
    getRange(rKey: string, start: number, end: number): Promise<any>   
    mget(rKey: string[]): Promise<any> 
    incr(rKey: string): Promise<boolean> 
    incrby(rKey: string, increment: number): Promise<boolean>
    incrbyFloat(rKey: string, increment: number): Promise<boolean>
    decr(rKey: string): Promise<boolean>   
    decrby(rKey: string, decrement: number): Promise<boolean> 
    del(rKey: string): Promise<boolean> 
    expire(rKey: string, seconds: number): Promise<boolean>
    ttl(rKey: string): Promise<boolean>   
    rpush(rKey: string, rValue: string): Promise<boolean> 
    rpushx(rKey: string, rValue: string): Promise<boolean> 
    lpush(rKey: string, rValue: string): Promise<boolean>   
    lrange(rKey: string, start: number, stop: number): Promise<boolean>
    lindex(rKey: string, index: number): Promise<boolean>
    linsert(rKey: string, position: 'BEFORE' | 'AFTER', pivot: string, rvalue: string): Promise<any>  
    llen(rKey: string): Promise<any>    
    lpop(rKey: string): Promise<any>    
    lset(rKey: string, index: number, value: string): Promise<any>
    ltrim(rKey: string, start: number, stop: number): Promise<any>  
    rpop(rKey: string): Promise<any>       
    rpoplpush(source: string, destination: string): Promise<any>              
    sadd(rKey: string, member: string, value: string): Promise<any> 
    smembers(rKey: string) : Promise<any>            
    scard(rKey: string): Promise<any> 
    srem(rKey: string, member: string, values: string): Promise<any>    
    sunion(rKey: string[]): Promise<any>       
    sinter(rKey: string[]): Promise<any>   
    hget(rKey: string, field: string): Promise<any>      
    hgetall(rKey: string): Promise<any>  
    hset(rKey: string, field: string, value: string): Promise<any>  
    hsetnx(rKey: string, field: string, value: string): Promise<any>
    hmset(rKey: string, field: string,value: string): Promise<any>
    hdel(rKey: string, value: string): Promise<any>   
    hexists(rKey: string, field: string): Promise<any>  
    hkeys(rKey: string): Promise<any>                
    hlen(rKey: string): Promise<any>               
    hvals(rKey: string): Promise<any>              
}

export interface Imset {
    key: string, value: string
}


/**
 * redis types for containers
 */
export const redisTypes = {
    IRedisHelper: Symbol.for("IRedisHelper"),
}