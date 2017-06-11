// controller to handle the login
app.controller('loginController', function ($scope, $rootScope, $state, $http, $localStorage, Notification) {

  if ($rootScope.user != null && $rootScope.user.token != "") {
    $rootScope.user = null;
    $localStorage.user = null;
  }

  $scope.loginUser = function() {

    $http({
      method: 'POST',
      url: app.path + "api/authenticate",
      data: $.param({
                      nickname: $scope.nickname,
                      password: $scope.password
                       }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (res.data.success) {
          $localStorage.user = {
            token : res.data.token,
            nickname : $scope.nickname,
            seller : res.data.seller
          };
          $rootScope.user = $localStorage.user;
          $state.go("home");
          Notification.success(res.data.message);
        }
        else
          Notification.error(res.data.message);
      },
      function(err) {
        Notification.error("Error!");
      }
    );

  };
});
