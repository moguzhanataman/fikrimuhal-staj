var config = {};
var runLocal = false;

config.api= {};

if (runLocal) {
	config.api.ip = "localhost";
} else {
	config.api.ip = "192.168.1.11";
}

config.api.port = "9000";
config.api.base ="http://" + config.api.ip + ":" +config.api.port + "/";
config.api.urls = { 
	customerList: config.api.base + "api/customers/current",
	employeeList: config.api.base + "api/employees"
};

var constant = {};
constant.cartSlider = {"ADD_ITEM": 0, "REMOVE_ITEM": 2, "CURRENT_ITEM": 1};

/*
config.api.url + 'api/customer'*/