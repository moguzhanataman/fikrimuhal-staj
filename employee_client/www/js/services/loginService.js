var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('loginService', ['$http', '$q' , function loginService($http, $q) {
    console.log("loginService  initialized");

    var mockEmployees = [
        {'id': 1, 'photoUrl': "./img/avatar-big.png", name:"Kasım Süzen", 'passwordHash': 2468},
        {'id': 2, 'photoUrl': "./img/avatar-big.png", name:"Oğuz Ataman", 'passwordHash': 2468},
        {'id': 3, 'photoUrl': "./img/avatar-big.png", name:"Ilgaz Şumnulu", 'passwordHash': 2468},
        {'id': 4, 'photoUrl': "./img/avatar-big.png", name:"Şükrü Hasdemir", 'passwordHash': 2468},
        {'id': 5, 'photoUrl': "./img/avatar-big.png", name:"Orhan Gencebay", 'passwordHash': 2468},
        {'id': 6, 'photoUrl': "./img/avatar-big.png", name:"Zeki Müren", 'passwordHash': 2468}
    ];

    var _loggedinEmployee = null;

    /**
     * @param: {string} employeeId for current employees id,
     * @param: {string}password for the code entered by user
     * @returns boolean, true for granteed access, false for denied access
     */
    function auth(employeeId, password) {
        var hashedPasscode = hashPasscode(password);
        var employee = _.find(mockEmployees, {'id': employeeId, 'passwordHash': hashedPasscode});
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
    function getEmployees() {
        return _.cloneDeep(mockEmployees);
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
     * @returns {int} hashed passcode
     */
    function hashPasscode(passcode) {
        return passcode * 2;
    }

    return {
        'auth': auth,
        'employees': getEmployees,
        'loggedinEmployee': loggedinEmployee,
        'isAuth': isLoggedin,
        'isLoggedin':isLoggedin,
        'logout': logout
    }
}]);