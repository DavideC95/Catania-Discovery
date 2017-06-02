var app = angular.module('app', [ 'ui.router', 'ui.bootstrap' ]);

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


//Modulo per la gestione della nav bar per la compatibilità a varie risoluzioni.
angular.module('ui.bootstrap').controller('CollapseCtrl', function ($scope) {
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
});
