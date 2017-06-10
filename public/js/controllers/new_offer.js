app.controller("newOfferController", function($scope, $rootScope, $http, Notification){
  $scope.saveOffer = function() {

    $http({
      method: 'POST',
      url: app.path + "api/new_offer",
      data: $.param({
        title: $scope.offerTitle,
        price: $scope.offerPrice,
        description: $scope.offerDescription,
        token: $rootScope.user.token
      }),
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
