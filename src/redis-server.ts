import { injectable } from "inversify";
import { Imset, IRedisHelper } from "./interface";

import { createClient }  from "redis";

import { promisify } from 'util'

/* create local client */
const client = createClient(6379)

// echo redis errors to the console
client.on('error', (err: any) => {
    console.log("Error " + err)
});


@injectable()
class RedisHelper implements IRedisHelper {
    /**
     *  start of Strings.
     */

    /**
     * # append a value to a key
     * @param {string} rKey -redis key
     * @param {string} rValue - value .
     */
    append = async(rKey: string, rValue: string) => {
        const getAsync = promisify(client.APPEND).bind(client);
        const res = await getAsync(rKey, rValue)
        return res;
    }
    /**
     * # set value in key
     * @param {string} rKey -redis key
     * @param {string} rValue - value .
     */
    set = async(rKey: string, rValue: string) => {
        const getAsync = promisify(client.SET).bind(client);
        const res = await getAsync(rKey, JSON.stringify(rValue))
        return res;
    }
    /**
     * # set if not exist value in key
     * @param {string} rKey -redis key
     * @param {string} rValue - value .
     */
    setnx = async(rKey: string, rValue: string) => {
        const getAsync = promisify(client.SETNX).bind(client);
        const res = await getAsync(rKey, JSON.stringify(rValue))
        return res;
    }
    /**
     * # get the length of the value stored in a key
     * @param {string} rKey -redis key
     */
    strlen = async(rKey: string) => {
        const getAsync = promisify(client.STRLEN).bind(client);
        const res = await getAsync(rKey)
        return res;
    }
    /**
     * # set multiple keys to multiple values
     * @param {Array<Imset>} data -redis key
     */
    mset = async(data: Array<Imset>) => {
        const arr = []; 
        for(let item of data) {
            arr.push(item.key);
            arr.push(JSON.stringify(item.value));
        }
        const getAsync = promisify(client.MSET).bind(client);
        const res = await getAsync(arr)
        return res;    
    }
    /**
     * # set multiple keys to multiple values, only if none of the keys exist
      * @param {string} rKey -redis key
     * @param {string} rValue - value .
     */
    msetnx = async(rKey: string, rValue: string) => { 
        const getAsync = promisify(client.MSETNX).bind(client);
        const res = await getAsync(rKey, rValue)
        return res;             
    }
    /**
     * #  get value in key
      * @param {string} rKey -redis key
     */
    get = async(rKey: string) => {  
        const getAsync = promisify(client.GET).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }
    /**
     * # get a substring value of a key and return its old value
      * @param {string} rKey -redis key
     * @param {number} start - start of string .
     * @param {number} end - end of string .
     */
    getRange = async(rKey: string, start: number, end: number) => {   
        const getAsync = promisify(client.GETRANGE).bind(client);
        const res = await getAsync(rKey, start, end)
        return res;            
    }

    /**
     * # get the values of all the given keys
      * @param {Array<string>} rKey -redis key
     */
    mget = async(rKey: string[]) => {   
        const getAsync = promisify(client.MGET).bind(client);
        const res = await getAsync(rKey)
        return res; 
    }

    /**
     * # increment value in key (if only its a number type)
      * @param {string} rKey -redis key
     */
    incr = async(rKey: string) => {  
        const getAsync = promisify(client.INCR).bind(client);
        const res = await getAsync(rKey)
        return res;      
    }

    /**
     * # increment the integer value of a key by the given amount (if only its a number type)
      * @param {string} rKey -redis key
      * @param {number} increment -increment count
     */
    incrby = async(rKey: string, increment: number) => {   
        const getAsync = promisify(client.INCRBY).bind(client);
        const res = await getAsync(rKey, increment)
        return res;            
    }

    /**
     * # increment the float value of a key by the given amount (if only its a number type)
      * @param {string} rKey -redis key
      * @param {number} increment -increment count (float)
     */
    incrbyFloat = async(rKey: string, increment: number) => { 
        const getAsync = promisify(client.INCRBYFLOAT).bind(client);
        const res = await getAsync(rKey, increment)
        return res;               
    }

    /**
     * # decrement value in key (if only its a number type)
      * @param {string} rKey -redis key
     */
    decr = async(rKey: string) => {    
        const getAsync = promisify(client.DECR).bind(client);
        const res = await getAsync(rKey)
        return res;           
    }

     /**
     * # decrement the integer value of a key by the given number (if only its a number type)
      * @param {string} rKey -redis key
      * @param {number} decrement -decrement count
     */
    decrby = async(rKey: string, decrement: number) => {  
        const getAsync = promisify(client.DECRBY).bind(client);
        const res = await getAsync(rKey, decrement)
        return res;             
    }

    /**
     * # delete key
      * @param {string} rKey -redis key
     */
    del = async(rKey: string) => {  
        const getAsync = promisify(client.DEL).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }

    /**
     * # key will be deleted in 120 seconds
      * @param {string} rKey -redis key
      * @param {number} seconds -expiry time
     */
    expire = async(rKey: string, seconds: number) => {  
        const getAsync = promisify(client.EXPIRE).bind(client);
        const res = await getAsync(rKey, seconds)
        return res;             
    }

    /**
     * # returns the number of seconds until a key is deleted
      * @param {string} rKey -redis key
     */
    ttl = async(rKey: string) => {    
        const getAsync = promisify(client.TTL).bind(client);
        const res = await getAsync(rKey)
        return res;                   
    }
    /**
     *  End of Strings.
     */
    /**
     *  start of Lists.
     *  A list is a series of ordered values
     */
     /**
     * # put the new value at the end of the list
      * @param {string} rKey -redis key
      * @param {string} rValue -redis value
     */
    rpush = async(rKey: string, rValue: string) => {          
        const getAsync = promisify(client.RPUSH).bind(client);
        const res = await getAsync(rKey, rValue)
        return res;             
    }
    /**
     * #  append a value to a list, only if the exists
      * @param {string} rKey -redis key
      * @param {string} rValue -redis value
     */
    rpushx = async(rKey: string, rValue: string) => {  
        const getAsync = promisify(client.RPUSHX).bind(client);
        const res = await getAsync(rKey, rValue)
        return res;            
    }
    /**
     * # put the new value at the start of the list
      * @param {string} rKey -redis key
      * @param {string} rValue -redis value
     */
    lpush = async(rKey: string, rValue: string) => {  
        const getAsync = promisify(client.LPUSH).bind(client);
        const res = await getAsync(rKey, rValue)
        return res;             
    }
    /**
     * #give a subset of the list
      * @param {string} rKey -redis key
      * @param {number} start -start range
      * @param {number} stop -stop range
     */
    lrange = async(rKey: string, start: number, stop: number) => {
        const getAsync = promisify(client.LRANGE).bind(client);
        const res = await getAsync(rKey, start, stop)
        return res;              
    }
    /**
     * # get an element from a list by its index
      * @param {string} rKey -redis key
      * @param {number} index -index of list
     */
    lindex = async(rKey: string, index: number) => {        
        const getAsync = promisify(client.LINDEX).bind(client);
        const res = await getAsync(rKey, index)
        return res;      
    }
    /**
     * # insert an element before or after another element in a list
      * @param {string} rKey -redis key
      * @param {string} position -postion need to insert
      * @param {string} pivot -value before or after
      * @param {string} rvalue -value before or after
     */
    linsert = async(rKey: string, position: 'BEFORE' | 'AFTER', pivot: string, rvalue: string) => {  
        const getAsync = promisify(client.LINSERT).bind(client);
        const res = await getAsync(rKey, position, pivot, rvalue)
        return res;            
    }
    /**
     * # return the current length of the list
      * @param {string} rKey -redis key
     */
    llen = async(rKey: string) => {  
        const getAsync = promisify(client.LLEN).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }
    /**
     * # remove the first element from the list and returns it
      * @param {string} rKey -redis key
     */
    lpop = async(rKey: string) => {    
        const getAsync = promisify(client.LPOP).bind(client);
        const res = await getAsync(rKey)
        return res;          
    }
    /**
     * # set the value of an element in a list by its index
      * @param {string} rKey -redis key
      *  @param {number} index -index of list
      *  @param {string} value -value need to set
     */
    lset = async(rKey: string, index: number, value: string) => {      
        const getAsync = promisify(client.LSET).bind(client);
        const res = await getAsync(rKey, index, value)
        return res;         
    }
    /**
     * # trim a list to the specified range
      * @param {string} rKey -redis key
      *  @param {number} start - start of the list
      *  @param {number} stop -stop of the list
     */
    ltrim = async(rKey: string, start: number, stop: number) => {  
        const getAsync = promisify(client.LTRIM).bind(client);
        const res = await getAsync(rKey, start, stop)
        return res;                     
    }
    /**
     * # remove the last element from the list and returns it
      * @param {string} rKey -redis key
     */
    rpop = async(rKey: string) => {   
        const getAsync = promisify(client.RPOP).bind(client);
        const res = await getAsync(rKey)
        return res;                    
    }
    /**
     * # remove the last element in a list, prepend it to another list and return it
      * @param {string} source -source key
      * @param {string} destination -destination key
     */
    rpoplpush = async(source: string, destination: string) => {      
        const getAsync = promisify(client.RPOPLPUSH).bind(client);
        const res = await getAsync(source, destination)
        return res;         
    }
    /**
     *  End of Lists.
     */
    /**
     *  start of sets.
     * A set is similar to a list, except it does not have a specific order and each element may only appear once. 
     */
    /**
     * # add the given value to the set
     * @version >= 2.4
      * @param {string} rKey -redis key
      * @param {string} member -redis member to push
      * @param {string} value -redis member to push
     */
    sadd = async(rKey: string, member: string, value: string) => {    
        const getAsync = promisify(client.SADD).bind(client);
        const res = await getAsync(rKey, member, value)
        return res;           
    }
    /**
     * # return a list of all the members of this set
      * @param {string} rKey -redis key
     */
    smembers = async(rKey: string) => { 
        const getAsync = promisify(client.SMEMBERS).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }
    /**
     * # get the number of members in a set
      * @param {string} rKey -redis key
     */
    scard = async(rKey: string) => {  
        const getAsync = promisify(client.SCARD).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }
    /**
     * # remove the given value from the set
      * @param {string} rKey -redis key
      *  @param {string} member -redis value to push
      * @param {string} values -values to remove
     */
    srem = async(rKey: string, member: string, values: string) => {  
        const getAsync = promisify(client.SREM).bind(client);
        const res = await getAsync(rKey, member, values)
        return res;            
    }
     /**
     * # combine two or more sets and returns the list of all elements
      * @param {Array<string>} rKey -redis key
     */
    sunion = async(rKey: string[]) => {   
        const getAsync = promisify(client.SUNION).bind(client);
        const res = await getAsync(rKey)
        return res;            
    }
    /**
     * # intersect multiple sets
      * @param {string} rKey -redis key
     */
    sinter = async(rKey: string[]) => {   
        const getAsync = promisify(client.SINTER).bind(client);
        const res = await getAsync(rKey)
        return res;             
    }
    /**
     *  End of sets.
     */
    /**
     *  start of Hashes.
     * Hashes are maps between string fields and string values, so they are the perfect data type to represent objects.
     */
    
    /**
     * # set the string value of a hash field
      * @param {string} rKey -redis key
      * @param {string} field -field
      * @param {string} value -value
     */
    hset = async(rKey: string, field: string, value: string) => {   
        const getAsync = promisify(client.HSET).bind(client);
        const res = await getAsync(rKey, field, value)
        return res;             
    }
    /**
     * # set the string value of a hash field, only if the field does not exists
      * @param {string} rKey -redis key
      * @param {string} field -field
      * @param {string} value -value
     */
    hsetnx = async(rKey: string, field: string, value: string) => {      
        const getAsync = promisify(client.HSETNX).bind(client);
        const res = await getAsync(rKey, field, value)
        return res;        
    }
    /**
     * # set multiple fields at once
      * @param {string} rKey -redis key
      * @param {string} field -field
      * @param {string} value -value
     */
    hmset = async(rKey: string, field: string,value: string) => { 
        const getAsync = promisify(client.HMSET).bind(client);
        const res = await getAsync(rKey, field,value)
        return res;             
    }
    /**
     * # get the value of a hash field
      * @param {string} rKey -redis key
      * @param {string} field -redis hash field
     */
    hget = async(rKey: string, field: string) => { 
        const getAsync = promisify(client.HGET).bind(client);
        const res = await getAsync(rKey, field)
        return res;              
    }
    /**
     * # get all the fields and values in a hash
      * @param {string} rKey -redis key
     */
    hgetall = async(rKey: string) => {  
        const getAsync = promisify(client.HGETALL).bind(client);
        const res = await getAsync(rKey)
        return res;            
    }
    
    /**
     * # determine if a hash field exists
      * @param {string} rKey -redis key
      * @param {string} field -field
     */
    hexists = async(rKey: string, field: string) => {  
        const getAsync = promisify(client.HEXISTS).bind(client);
        const res = await getAsync(rKey, field)
        return res;             
    }
    /**
     * # get all the fields in a hash
      * @param {string} rKey -redis key
     */
    hkeys = async(rKey: string) => { 
        const getAsync = promisify(client.HKEYS).bind(client);
        const res = await getAsync(rKey)
        return res;                      
    }
    /**
     * # get all the fields in a hash
      * @param {string} rKey -redis key
     */
    hlen = async(rKey: string) => {  
        const getAsync = promisify(client.HLEN).bind(client);
        const res = await getAsync(rKey)
        return res;              
    }
    /**
     * # get all the fields in a hash
      * @param {string} rKey -redis key
     */
    hvals = async(rKey: string) => {      
        const getAsync = promisify(client.HVALS).bind(client);
        const res = await getAsync(rKey)
        return res;         
    }
    /**
     * # delete one or more hash fields
      * @param {string} rKey -redis key
      * @param {string} field -field
     */
    hdel = async(rKey: string, value: string) => {   
        const getAsync = promisify(client.HDEL).bind(client);
        const res = await getAsync(rKey, value)
        return res;           
    }
}



export default RedisHelper