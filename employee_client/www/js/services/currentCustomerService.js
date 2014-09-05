fikrimuhalStaj.factory('currentCustomerService', ['$http', '$q', function ($http, $q, get) {
    return {
        setCustomerById: setCustomerById,
        getCustomer: getCustomer
    };

    var currentCustomerId;

    // ---
    // PUBLIC METHODS
    // ---

    /**
     * Gets customer from server side
     * @returns {promise}
     */
    function getCustomer() {
            console.log("url mi",config.api.urls.customerById(currentCustomerId));
        var request = $http({
            method: "get",
            url: config.api.urls.customerById(currentCustomerId)
        });

        return request.then(handleSuccess, handleError);
    }

    // currentCustomer'ı set eder
    function setCustomerById(customerId) {

        currentCustomerId = customerId;
        console.log("burası current service", currentCustomerId);

    }

    // ---
    // PRIVATE METHODS
    // ---

    function handleSuccess(response) {

        return( response.data );

    }

    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


}]);