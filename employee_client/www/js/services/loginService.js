fikrimuhalStaj.factory('loginService', ['$http', '$q', 'storageService', function loginService($http, $q, storageService) {
    var cache = cached($q, _fetchEmployeesFromServer, storageService, "employees");
    // TODO JSDoc
    var getEmployees = cache.promise;

    var _loggedinEmployee = null;

    function _fetchEmployeesFromServer(){
        return $http({method: 'GET', url: config.api.urls.employeeList}).then(function (response) {
            return response.data.employees;
        });
    }

    /**
     * Gets last logged in employee from localStorage via storageService
     * @returns {json} Employee JSON
     */
    function getLastLoggedinEmployee() {
        return storageService.get(constant.storage.loggedEmployee);
    }

    function initEmployee() {
        _loggedinEmployee = getLastLoggedinEmployee();
        console.log("asdf",_loggedinEmployee);
    }

    /**
     * @param: {string} employeeId for current employees id,
     * @param: {string} password for the code entered by user
     * @returns boolean, true for granteed access, false for denied access
     */
    function auth(employeeId, password) {
        var hashedPasscode = hashPasscode(password);
        var employee = _.find(cache.list, {'id': employeeId, 'passwordHash': hashedPasscode});
        if (employee) {
            _loggedinEmployee = employee;
            // Register employee in localStorage
            storageService.put(constant.storage.loggedEmployee, employee);
            console.log("storing last logged employee");
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
        storageService.remove(constant.storage.loggedEmployee);
    }

    /**
     * @param: {int} passcode Employee's passcode
     * @returns {string} hashed passcode
     */
    function hashPasscode(passcode) {
        return CryptoJS.MD5(passcode).toString();
    }

    function getEmployeeById(id){
        var list;
        var defered = $q.defer();

        defered.resolve(getEmployees().then(function (employeeList){
            list = employeeList;
            return _.find(list,{"id":id});
        }));

        return defered.promise;
    }

    initEmployee();

    return {
        'auth': auth,
        'getEmployeeList': getEmployees,
        'loggedinEmployee': loggedinEmployee,
        'isAuth': isLoggedin,
        'isLoggedin':isLoggedin,
        'getLastLoggedinEmployee': getLastLoggedinEmployee,
        'getEmployeeById': getEmployeeById,
        'logout': logout
    }
}]);