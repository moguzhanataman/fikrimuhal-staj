var config = {};

config.api= {};

config.api.ip = "192.168.1.11";
config.api.port = "9000";
config.api.base ="http://" + config.api.ip + ":" +config.api.port + "/";
config.api.urls = { 
	customerList: config.api.base + "api/customers/current" };

var constant = {};
constant.cartSlider = {"REMOVE_ITEM": 1, "CURRENT_ITEM": 0};

/*
config.api.url + 'api/customer'*/