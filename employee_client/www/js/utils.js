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
function cached($q, fetchFromServer) {
    console.log("1111");
    var cacheList = [];

    function updateCacheList (data) {
        cacheList = data;
    }

    function getCacheList () {
        return cacheList;
    }

    var cachePromise = function(updateFromServer) {
        var defered = $q.defer();

        if (updateFromServer) {
            fetchFromServer().then( function (data) {
                updateCacheList(data);
                defered.resolve(_.cloneDeep(cacheList));
            }).catch(function (){
                defered.reject(_.cloneDeep(cacheList));
            })
        } else {
            console.log("4444");
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

    console.log("6666", result);

    return result;
}