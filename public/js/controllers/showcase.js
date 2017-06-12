app.controller('showCaseController', function ($scope, $http, Notification) {
    $http.get(app.path + "api/offers").then(function(response) {
      $scope.offers = response.data;
    });

  $scope.takeOffer = function(offer, user) {

    if (user.seller)
      return;

    $http({
      method: 'POST',
      url: app.path + "api/take_offer",
      data: $.param({
        offer_id: offer._id,
        token: user.token
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (res.data.success) {
          Notification.success(res.data.message);
          offer.quantity--;
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
