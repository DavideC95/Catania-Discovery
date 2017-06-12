app.controller('profileController', function ($rootScope, $scope, $http, $stateParams) {

  var nickname = $stateParams.nickname;

  if ($rootScope.user) {
    $http.get(app.path + "api/get_user_details?nickname=" + nickname)
      .then(function(res) {

        $scope.userDetails = res.data;

      }, function(res) {
        console.log("http error!");
    });
  }
});
