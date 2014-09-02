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
        'left': listL,
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
function cached($q, fetchFromServer, storageService, key) {

    var saveOnLocalStorage = !!storageService;

    var cacheList;
    if (saveOnLocalStorage) {
        cacheList = storageService.get(key);
    } else {
        cacheList = [];
    }

    function updateCacheList(value) {

        cacheList = value;
        if (saveOnLocalStorage) {
            storageService.put(key, value);
        }
    }

    function getCacheList() {
        return cacheList;
    }

    var cachePromise = function (returnFirstCache) {
        var deferred = $q.defer();
        if (!returnFirstCache) {
            fetchFromServer().then(function (data) {
                updateCacheList(data);
                deferred.resolve(_.cloneDeep(cacheList));
            }).catch(function () {
                deferred.reject(_.cloneDeep(cacheList));
            })
        } else {
            fetchFromServer().then(function (data) {
                updateCacheList(data);
            });
            deferred.resolve(_.cloneDeep(cacheList));
        }

        return deferred.promise;

    };

    return {
        "promise": cachePromise,
        get list() {
            return _.cloneDeep(cacheList);
        },
        set list(data) {
            console.error("Cache i dışarıdan değiştiremezsin!!! Birşeyleri yanlış yapıyorsun.");
        }

    }
}