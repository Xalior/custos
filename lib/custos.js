/**
 * Created by darran on 14/08/2014.
 */
"use strict";

var caches = {
    pools: {},
    tags: {}
};

var CustosManager = {
    debug: function() {
        var date = new Date(),
          longdate = date.getHours().toString()+":"+
                     date.getMinutes().toString()+":"+
                     date.getSeconds().toString()+" "+
                     date.getDate().toString()+"/"+
                     date.getDate().toString()+"/"+
                     date.getFullYear();
      console.log("custos.debug at "+longdate+" is "+JSON.stringify(caches));
        
    },

    set: function(pool, key, val, tags) {
        console.log("Cache request for "+pool+
                    " to store "+key+" with value "+
                    val+" and tags: "+JSON.stringify(tags));
        // Does this pool already exist?
        if(!(pool in caches.pools)) {
            // if not create it
            caches.pools[pool] = {};
        }
        // store our val, at key, in our named pool
        caches.pools[pool][key] = val;

        // tagging cache entries is optional...
        if(tags) {
            // but if we have tags, and the pool is fresh, or has never been tagged
            if (!(pool in caches.tags)) {
                // we create a named tagpooll
                caches.tags[pool] = {};
            }
            // the system is designed for multiple tags per store
            if(typeof tags !='object') {
                // so if we were passed a single tag, spin it up to an iterable of one.
                tags = [tags];
            }
            // iterate the tags
            tags.forEach(function(tag){
                // not all tags will have been used before
                if(!(tag in caches.tags[pool])) {
                    // if they have not, create a fresh pool in the named tag pool, and store our key
                    caches.tags[pool][tag] = [];
                }
                // just push the key in there...
                caches.tags[pool][tag].push(key);
            });
        }
    },

    get: function(pool, key) {
        if(caches.pools[pool][key])
            return(caches.pools[pool][key]);
        return undefined;
    }
};

module.exports=CustosManager;