app.controller('showCaseController', function ($scope,$http) {
    $http.get(app.path + "api/offers").then(function(response) {
        $scope.offers = response.data;
    });
});
