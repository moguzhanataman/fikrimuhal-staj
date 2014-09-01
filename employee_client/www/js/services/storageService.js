/**
 * Created by oguzhan on 9/1/14.
 */

var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('storageService',function () {

    /**
     *
     * @param key
     * @returns {*}
     */
    function get(key) {
        var data = window.localStorage.getItem(key);
        var json;
        try {
            json = JSON.parse(data);
        } catch (e) {
            console.error(e);
        }
        return json;
    }

    /**
     * @param key {string}
     * @param value {JSON}
     * @returns {boolean} True on update, false on insert
     */
    function put (key, value) {
        var jsonAsString = JSON.stringify(value);
        var contains = !!get(key);
        window.localStorage.setItem(key, jsonAsString);
        return contains;
    }

    function purge () {
        window.localStorage.clear();
    }

    // TODO Remove ettiyse true döndürsün.
    function remove (key) {
        window.localStorage.removeItem(key);
    }

    return {
        "get": get,
        "put": put,
        "purge": purge,
        "remove": remove
    }
});