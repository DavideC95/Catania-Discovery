app.controller('myOfferController', function ($rootScope, $scope, $http) {
    $http.get(app.path + "api/offers?nickname=" + $rootScope.user.nickname).then(function(response) {
        $scope.offers = response.data;
    });

    $scope.save = function(offer) {

      var params = {
        title: offer.title,
        price: offer.price,
        quantity: offer.quantity,
        description: offer.description,
        id: offer._id,
        token: $rootScope.user.token
      };

      $http({
        method: 'POST',
        url: app.path + "api/modify_offer",
        data: $.param(params),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(
        function(res) {
          if (!res.data.success)
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
