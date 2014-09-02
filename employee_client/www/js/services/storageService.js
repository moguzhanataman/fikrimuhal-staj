/**
 * Created by oguzhan on 9/1/14.
 */

var fikrimuhalStaj = angular.module('fikrimuhalStaj');

/**
 * Storage service of application. Uses localStorage.
 */
fikrimuhalStaj.factory('storageService',function () {
    /**
     * Get item from localStorage.
     * @param key {string}
     * @returns {JSON}
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

    /**
     * Removes all entries from localStorage.
     */
    function purge () {
        window.localStorage.clear();
    }

    /**
     * Removes an item from localStorage.
     * @param key {string} item key in localStorage.
     * @returns {boolean} true if item removed, otherwise false.
     */
    function remove (key) {
        var deleted;
        window.localStorage.removeItem(key);
        if (get(key)) {
            deleted = false;
        } else {
            deleted = true;
        }
        return deleted;
    }

    return {
        "get": get,
        "put": put,
        "purge": purge,
        "remove": remove
    }
});