//Controller per la gestione della registrazione.
app.controller('registerController', function ($scope,$http, $state, Notification) {

  // Init Flags
  $scope.seller = false;

  $scope.registerUser = function() {
    $http({
      method: 'POST',
      url: app.path + "api/register",
      data: $.param({ email: $scope.email,
        nickname: $scope.nickname,
        password: $scope.password,
        phone: $scope.mobile,
        birth: $scope.birth,
        name: $scope.name,
        surname: $scope.surname,
        seller: $scope.seller
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (res.data.success) {
          Notification.success(res.data.message);
          $scope.alertMessage = res.data.message;
//          $state.go("home");
        }
        else {
          Notification.error(res.data.message);
          $scope.alertMessage = res.data.message;
        }
      },
      function(err) {
        Notification.error("Error!");
        $scope.alertMessage = "Registered successfully! Check email!";
      }
    );

  };


});
