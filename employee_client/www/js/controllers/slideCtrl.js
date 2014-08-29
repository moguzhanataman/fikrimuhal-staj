fikrimuhalStaj.controller('SlideController', function ($scope) {

    $scope.currentSlide = 1;

    $scope.slideChanged = function (currSlide) {
        $scope.currentSlide = currSlide;
        console.log('Active Slide=' + $scope.currentSlide);
    }
});