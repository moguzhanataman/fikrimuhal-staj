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

    /**
    * Description: Bu fonksiyon Phonegapte iBeaconı çalıştırabilmek için https://github.com/petermetz/cordova-plugin-ibeacon den alınmıştır 
    * TODO: Test edilmesi lazım 
    */
    function iBeaconStartMonitoring(){

        var logToDom = function (message) {
        var e = document.createElement('label');
        e.innerText = message;

        var br = document.createElement('br');
        var br2 = document.createElement('br');
        document.body.appendChild(e);
        document.body.appendChild(br);
        document.body.appendChild(br2);

        window.scrollTo(0, window.document.height);
        };

        var delegate = new cordova.plugins.locationManager.Delegate().implement({

            didDetermineStateForRegion: function (pluginResult) {

                logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                    + JSON.stringify(pluginResult));
            },

            didStartMonitoringForRegion: function (pluginResult) {
                console.log('didStartMonitoringForRegion:', pluginResult);

                logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
            },

            didRangeBeaconsInRegion: function (pluginResult) {
                logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
            }

        });

        var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
        var identifier = 'beaconOnTheMacBooksShelf';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        cordova.plugins.locationManager.setDelegate(delegate);
        cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
    }

    function iBeaconStopMonitoring () {
        var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
        var identifier = 'beaconOnTheMacBooksShelf';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();
    }

    return{
    	'setUserID': currentCustomerSetter,
    	'getUserID': getCurrentCustomerID,
        'startMonitoring' : iBeaconStartMonitoring,
        'stopMonitoring' : iBeaconStopMonitoring

    }
 });