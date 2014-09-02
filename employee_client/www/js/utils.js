/**
 * Splits array of objects into map of arrays
 *
 * @param {array} list the list to split
 * @returns {array} array of two array of objects
 */
function splitArray(list) {
    var listL = [];
    var listR = [];

    for (var i = 0; i <= list.length - 1; i++) {

        if (i % 2 == 0) {
            listL.push(list[i]);
        } else {
            listR.push(list[i]);
        }
    }

    return {
        'left':  listL,
        'right': listR
    }
}

function TODO() {
    console.log("Not Implemented Yet.");
}

/**
 *
 * @param $q
 * @param fetchFromServer {function}
 * @param cacheList {Array}
 * @param updateFromServer
 * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise}
 */
function cached($q, fetchFromServer, storageService, key, x) {
    if(x) {
        console.log("product service cache");
    }
    var saveOnLocalStorage = !!storageService;
    console.log("333");
    var cacheList;
    if(saveOnLocalStorage) {
        console.log("444");
        cacheList = storageService.get(key);
    } else {
        cacheList = [];
        console.log("5555", key);

    }

    function updateCacheList (value) {

        if(x) {
            console.log("fetch product list çağrıldı", "key", key, "value", value);
        }
        cacheList = value;
        if(saveOnLocalStorage) {
            console.log("fetch product list çağrıldı", "key", key, "value", value);
            storageService.put(key, value);
        }
    }

    function getCacheList () {
        return cacheList;
    }

    var cachePromise = function(returnFirstCache) {
        var defered = $q.defer();
        console.log("22222");
        if (!returnFirstCache) {
            fetchFromServer().then( function (data) {
                updateCacheList(data);
                defered.resolve(_.cloneDeep(cacheList));
            }).catch(function (){
                defered.reject(_.cloneDeep(cacheList));
                console.log("1111", cacheList);
            })
        } else {
            fetchFromServer().then( function (data) {
                updateCacheList(data);
            });
            defered.resolve(_.cloneDeep(cacheList));
        }

        return defered.promise;

    };

    var result = {
        "promise": cachePromise,
        get list() {
            return _.cloneDeep(cacheList);
        },
        set list(data) {
            console.error("Cache i dışarıdan değiştiremezsin!!! Birşeyleri yanlış yapıyorsun.");
        }

    };
    return result;
}