fikrimuhalStaj.factory('loginService', ['$http', '$q' , function loginService($http, $q) {
    var cache = cached($q, _fetchEmployeesFromServer);
    var getEmployees = cache.promise;

    var _loggedinEmployee = null;

    function _fetchEmployeesFromServer(){
        return $http({method: 'GET', url: config.api.urls.employeeList}).then(function (response) {
            var employees = response.data.employees;
            return employees;
        });
    }

    /**
     * @param: {string} employeeId for current employees id,
     * @param: {string}password for the code entered by user
     * @returns boolean, true for granteed access, false for denied access
     */
    function auth(employeeId, password) {
        var hashedPasscode = hashPasscode(password);
        var employee = _.find(cache.list, {'id': employeeId, 'passwordHash': hashedPasscode});
        if (employee) {
            _loggedinEmployee = employee;
        }
        else {
            //A kullanıcı login olmuşdurumda iken
            //B kullanıcısı login olmaya calisiyor ve yanlis password giriyor
            //Bu durumda A kullanıcısınıda logout ediyoruz.
            logout();
        }

        return  isLoggedin();
    }




    /**
     * @return {object} returns employee {'id':8, 'name':"mehmet", 'photoData': "base64" }
     * if there is no employee by given id it will return null
     */
    function loggedinEmployee() {
        return _.cloneDeep(_loggedinEmployee);
    }

    /**
     * @return {boolean} true for acknowledge users, false for unknown user
     */
    function isLoggedin() {

        return !!_loggedinEmployee;
    }

    /**
     * Logs employee out
     */
    function logout() {
        console.log("LOGOUT me please");
        _loggedinEmployee = null;
    }

    /**
     * @param: {int} passcode Employee's passcode
     * @returns {string} hashed passcode
     */
    function hashPasscode(passcode) {
        return CryptoJS.MD5(passcode).toString();
    }

    return {
        'auth': auth,
        'getEmployeeList': getEmployees,
        'loggedinEmployee': loggedinEmployee,
        'isAuth': isLoggedin,
        'isLoggedin':isLoggedin,
        'logout': logout
    }
}]);

var fikrimuhalStaj = angular.module('fikrimuhalStaj');
