var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('loginService', ['$http', '$q' , function loginService($http, $q) {

    var _loggedinEmployee = null;
    var _employeeListCache;

    function _fetchEmployeesFromServer(){
        return $http({method: 'GET', url: config.api.urls.employeeList}).success(function (data) {
            _employeeListCache = data.employees;
        })
    }

    /**
     * @param: {string} employeeId for current employees id,
     * @param: {string}password for the code entered by user
     * @returns boolean, true for granteed access, false for denied access
     */
    function auth(employeeId, password) {
        var hashedPasscode = hashPasscode(password);
        var employee = _.find(_employeeListCache, {'id': employeeId, 'passwordHash': hashedPasscode});
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
     * TODO: mock will be replaced by json api call
     * @returns {Array} employee array
     */
    function getEmployees(updateFromServer) {
        var deferred = $q.defer();

        if(updateFromServer){

            _fetchEmployeesFromServer().then(function (value){
                deferred.resolve(_.cloneDeep(_employeeListCache));
            }).catch(function (){
                deferred.reject(_.cloneDeep(_employeeListCache));
            });

        }else{
            _fetchEmployeesFromServer();
            deferred.resolve(_.cloneDeep(_employeeListCache));

        }

        return deferred.promise;
        //return _.cloneDeep(mockEmployees);
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
        return "" + passcode * 2;
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