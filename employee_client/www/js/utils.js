/**
 * Splits array of objects to two different arrays
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