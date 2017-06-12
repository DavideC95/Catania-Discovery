app.controller("newOfferController", function($scope, $rootScope, $http, $timeout, Notification, Upload){

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
            data: { sampleFile: file, token: $rootScope.user.token, offer: true }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if (!response.data.success)
                  Notification.error(response.data.message);
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });
    }
  };

  $scope.saveOffer = function() {

    var params = {
      title: $scope.offerTitle,
      price: $scope.offerPrice,
      quantity: $scope.offerQuantity,
      description: $scope.offerDescription,
      img_path: ($scope.f != null && $scope.f.name != '') ? $scope.f.name : 'default-offer.png',
      token: $rootScope.user.token
    };

    $http({
      method: 'POST',
      url: app.path + "api/new_offer",
      data: $.param(params),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (res.data.success)
          Notification.success(res.data.message);
        else
          Notification.error(res.data.message);
      },
      function(err) {
        Notification.error("Error!");
      }
    );

  };
});
