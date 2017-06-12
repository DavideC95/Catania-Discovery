var app = angular.module('app', [ 'ui.router',
                                  'ui-notification',
                                  'ngStorage',
                                  'ui.bootstrap',
                                  'ngFileUpload',
                                  'angular-loading-bar']);


app.run(function($rootScope, $localStorage, $http){
  $rootScope.user = ($localStorage.user != null && $localStorage.user.token != "") ? $localStorage.user : "";

  if ($localStorage.user != null && $localStorage.user.token != null && $localStorage.user.token != "") {
    $http({
      method: 'POST',
      url: app.path + "api/getExpireTime",
      data: $.param({ token: $localStorage.user.token
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(
      function(res) {
        if (!res.data.success) {
          $rootScope.user = null;
          $localStorage.user = null;
        }
      },
      function(err) {
        Notification.error("Error!");
      }
    );
  }

});
