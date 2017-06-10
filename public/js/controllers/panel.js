app.controller('panelController', function ($rootScope, $scope, $http, Notification, Upload) {

  // init variables
  $scope.f = null;
  $scope.errFile = null;

  // update file path
  $scope.setFile = function(file, errFiles) {
     $scope.f = file;
     $scope.errFile = errFiles && errFiles[0];
  };

  // upload file
  $scope.uploadFile = function(file, errFiles) {
    if (file) {
        file.upload = Upload.upload({
            url: app.path + "api/upload_img",
            data: { sampleFile: file, token: $rootScope.user.token }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if (response.data.success)
                  Notification.success(response.data.message);
                else
                  Notification.error(response.data.message);
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
    }
  };

  if ($rootScope.user) {
    $http.get(app.path + "api/get_user_details?nickname=" + $rootScope.user.nickname)
      .then(function(res) {

        $scope.userDetails = res.data;

        $scope.f = $scope.userDetails.propic;

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
