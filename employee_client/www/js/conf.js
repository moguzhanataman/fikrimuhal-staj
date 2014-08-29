var config = {};

config.api= {};

config.api.ip = "192.168.1.11";
config.api.port = "9000";
config.api.base ="http://" + config.api.ip + ":" +config.api.port + "/";
config.api.urls = { customerList: config.api.base + "api/customers/current" };

var constant = {};
constant.cartSlider = {"ADD_ITEM": 0, "REMOVE_ITEM": 2, "CURRENT_ITEM": 1};

/*
config.api.url + 'api/customer'*/