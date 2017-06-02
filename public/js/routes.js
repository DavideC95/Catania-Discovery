var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state("profile", {
    url: '/profile',
    templateUrl: "partials/profile.html",
    controller:"profileController"
    })

    .state('initial', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    
    .state("showcase", {
	  url: "/showcase",
	  templateUrl: "partials/showcase.html",
	  controller:"showCaseController"
	});

});
	
