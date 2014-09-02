var fikrimuhalStajCustomer = angular.module('fikrimuhalStajCustomer');

fikrimuhalStajCustomer.factory('customerService',function customerService() {

    
    /*
    * description: güncel müşteri idsini local scope set eder.
    * @param: {int} id müşteri idsidir
    */
    function currentCustomerSetter(id){
        currentCustomerID = id;
    }

    /**
    * description: local scopedaki müşteri idsini getirir.
    * @return: {int} müşteri idsini döndürür
    */
    function getCurrentCustomerID(){
        return currentCustomerID;
    }

    function TODO(){

    }

    return{
    	'setUserID':currentCustomerSetter,
    	'getUserID': getCurrentCustomerID,
        'TODO':TODO
    }
 });