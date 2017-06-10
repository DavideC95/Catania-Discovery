app.controller('panelController', function ($rootScope, $scope, $http) {
  if ($rootScope.user) {
    $http.get(app.path + "api/get_user_details?nickname=" + $rootScope.user.nickname)
      .then(function(res) {

        $scope.userDetails = res.data;

      }, function(res) {
        console.log("http error!");
    });
  }
});
