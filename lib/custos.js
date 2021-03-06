/**
 * Created by darran on 14/08/2014.
 */
"use strict";

var caches = {
    pools: {},
    tags: {},
    indexes: {},
    schedules: {}
};

var CustosManager = {

    debug: {
        stdout: function() {
            var date = new Date(),
                longdate = date.getHours().toString()+":"+
                    date.getMinutes().toString()+":"+
                    date.getSeconds().toString()+" "+
                    date.getDate().toString()+"/"+
                    date.getDate().toString()+"/"+
                    date.getFullYear();
            console.log("\ncustos.debug at "+longdate+" is:");

            console.log(caches);

            console.log("("+JSON.stringify(caches)+")");
        },
        caches: function() {
            return caches;
        }
    },

    set: function(pool, key, val, tags, expires) {
        console.log("Cache request for "+pool+
                    " to store "+key+" with value "+
                    val+" and tags: "+JSON.stringify(tags));
        if(!pool)
            pool = 'CUSTOS_DEFAULT_POOL';
        // Does this pool already exist?
        if(!(pool in caches.pools)) {
            // if not create
            caches.pools[pool] = {};
            // and the matching index
            caches.indexes[pool] = {}
        }
        // store our val, at key, in our named pool
        caches.pools[pool][key] = val;

        // tagging cache entries is optional...
        if(tags) {
            // but if we have tags, and the pool is fresh, or has never been tagged
            if (!(pool in caches.tags)) {
                // we create a named tagpool
                caches.tags[pool] = {};
            }
            // the system is designed for multiple tags per store
            if(typeof tags !='object') {
                // so if we were passed a single tag, spin it up to an iter-able of one.
                tags = [tags];
            }
            // now we have some consistency...
            // we should stick an index entry for it, so we can reverse look up, with much fast
            caches.indexes[pool][key] = tags;

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

        if(expires) {
            /*
             * ::TODO::
             *
             *  The principle is set an expire interval in caches.schedules
             *
             */
        }
    },

    get: function(pool, key) {
        if((caches.pools[pool]) && (caches.pools[pool][key]))
            return(caches.pools[pool][key]);
        return undefined;
    },

    exp: function(pool, tag) {

    },

    del: function(pool, key) {
        if((caches.pools[pool]) && (caches.pools[pool][key])) {
            delete(caches.pools[pool][key]);
            if ((caches.indexes[pool]) && (caches.indexes[pool][key]))
                delete(caches.indexes[pool][key]);
        }
    }
};

module.exports=CustosManager;