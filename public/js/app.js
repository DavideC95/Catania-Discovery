var app = angular.module('app', [ 'ui.router',
                                  'ui-notification',
                                  'ngStorage',
                                  'ui.bootstrap']);


app.controller('homeController', function ($scope) {
  $scope.helloworld = "Hello world by AngularJS";
});

app.controller('showCaseController', function ($scope,$http) {
    $http.get("jsonprint.json").then(function(response) {
        $scope.myData = response.data.records;
    });
});

app.controller('profileController', function ($scope,$http) {
	$scope.helloworld = "Hello world by AngularJS";
});

app.controller('sellerController', function ($scope,$http) {
	$scope.helloworld = "Hello world by AngularJS";
});
