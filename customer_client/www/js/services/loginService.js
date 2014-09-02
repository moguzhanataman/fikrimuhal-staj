var fikrimuhalStajCustomer = angular.module('fikrimuhalStajCustomer');

fikrimuhalStajCustomer.factory('loginService', ['customerService' ,function loginService(customerService) {
   
    var mockUserList = [ 
		{"id":1,"name":"M. Oğuzhan Ataman","photoUrl":"./img/oguz.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":2,"name":"Kasım Süzen","photoUrl":"./img/kasim.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":3,"name":"Ilgaz Şumnulu","photoUrl":"./img/ilgaz.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":4,"name":"Şükrü Hasdemir","photoUrl":"./img/sukru.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":5,"name":"Orhan Gencebay","photoUrl":"./img/orhan.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":6,"name":"Zeki Müren","photoUrl":"./img/zeki.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"},
		{"id":7,"name":"Hakkı Bulut","photoUrl":"./img/hakki.jpg","passwordHash":"81dc9bdb52d04dc20036dbd8313ed055"}
    ]

    var customerList = mockUserList;

    /**
    * Description: customerListi çağırana gönderirir.
    * @return {array of object} customer list tutuyor
    */
    function getUserList(){
    	return customerList;
    }

    

    return{ 
        'getUserList': getUserList

    }

}]);
