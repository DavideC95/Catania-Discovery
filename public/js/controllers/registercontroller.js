//Controller per la gestione della registrazione.
app.controller('RegisterController', function ($scope,$http, $state, Notification) {
  $scope.helloworld = "Hello world by AngularJS";
});

app.controller('checkStatusController', function ($scope) {

	$scope.checkType = {
	    tourist: false,
	    seller: false,
	    };

	$scope.result = [];

  	$scope.$watchCollection('checkType', function () {
    	$scope.result = [];
    	angular.forEach($scope.checkType, function (value, key) {
      	if (value) {
        	$scope.result.push(key);
      		}
    	});
  	});
});

