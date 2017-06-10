app.controller('panelController', function ($rootScope, $scope, $http, Notification) {
  if ($rootScope.user) {
    $http.get(app.path + "api/get_user_details?nickname=" + $rootScope.user.nickname)
      .then(function(res) {

        $scope.userDetails = res.data;

      }, function(res) {
        console.log("http error!");
    });
  }

  $scope.saveDetails = function() {

    $http({
      method: 'POST',
      url: app.path + "api/update_details",
      data: $.param({
        name: $scope.userDetails.name,
        surname: $scope.userDetails.surname,
        phone: $scope.userDetails.phone,
        description: $scope.userDetails.description,
        token: $rootScope.user.token
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (res.data.success) {
          console.log(res.data);
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
