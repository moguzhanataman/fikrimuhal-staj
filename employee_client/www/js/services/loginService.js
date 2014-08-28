var app = angular.module('fikrimuhalStaj');

app.factory('loginService',['$http', '$q' ,function loginService($http,$q) {
	console.log("loginService  initialized");
	
	var mockEmployees= [
        {'id':2,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468},
        {'id':3,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468},
        {'id':4,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468},
        {'id':1,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468},
        {'id':5,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468},
        {'id':6,'photoUrl':"/img/placeholder_large.png", 'passwordHash': 2468}
    ];

    var _loggedinEmployee = null;

    /**
	 * @param: {string} employeeId for current employees id,
	 * @param: {string}password for the code entered by user
	 * @returns boolean, true for granteed access, false for denied access
     */
	function auth(employeeId, password){
		var hashedPasscode = hashPasscode(password);
		var employee = _.find(mockEmployees, {'id': employeeId, 'passwordHash': hashedPasscode})
		if(employee) {
			_loggedinEmployee = employee;
			console.log("auth  employee:", employee);
		}
		else{
			console.error("olmaması lazım");
		}

		var isauth = isAuth();
		console.log("auth:", isauth);
		return isauth;
	}

	/**
	* TODO: mock will be replaced by json api call
	 * @returns {Array} employee array
	 */
	function getEmployees(){
 		return _.cloneDeep(mockEmployees);
	}

	/**
	* @return {object} returns employee {'id':8, 'name':"mehmet", 'photoData': "base64" } 
	* if there is no employee by given id it will return null
	*/
	function loggedinEmployee(){
		return _.cloneDeep(_loggedinEmployee);
	}

	/**
	* @return {boolean} true for acknowledge users, false for unknown user
	*/
	function isAuth()
	{
		/*
		if(_loggedinEmployee) {
			return true;
		} else {
			return false;
		}*/
		return !!_loggedinEmployee;
	}

	/**
	* Logs employee out
	*/
	function logout(){
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
		'auth':auth,
		'employees':getEmployees,
		'loggedinEmployee':loggedinEmployee,
		'isAuth':isAuth,
		'logout': logout
	}
}])