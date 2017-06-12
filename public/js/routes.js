var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "partials/home.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "partials/login.html",
      controller:"loginController"
    })
    .state("register", {
      url: "/register",
      templateUrl: "partials/register.html",
      controller: "registerController"
    })
    .state("profile", {
      url: '/profile/:nickname',
      templateUrl: "partials/profile.html",
      controller:"profileController"
    })
    .state("seller", {
      url: '/seller',
      templateUrl: "partials/seller.html",
      controller:"sellerController"
    })
    .state("panel", {
      url: '/panel',
      templateUrl: "partials/panel.html",
      controller: "panelController"
    })
    .state("showcase", {
  	  url: "/showcase",
  	  templateUrl: "partials/showcase.html",
  	  controller:"showCaseController"
    })
    .state("newoffer", {
      url: "/newoffer",
      templateUrl: "partials/new_offer.html",
      controller: "newOfferController"
    })
    .state("my_offers", {
      url: "/my_offers",
      templateUrl: "partials/my_offers.html",
      controller:"myOfferController"
    })
    .state("contact", {
  	  url: "/contact",
  	  templateUrl: "partials/contact.html"
    });

});
