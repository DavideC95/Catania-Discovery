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
app.controller('CollapseController', function ($scope) {
  $scope.isNavCollapsed = true; //L'unica che vorrei implementare nel menù a tendina per sm. by DC
});
