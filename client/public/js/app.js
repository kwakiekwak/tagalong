'use strict';
var app = angular.module('userApp', ['ui.router', 'authService', 'userService', 'rideService'])
  .config(['$stateProvider', '$urlRouterProvider', MainRouter])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  })

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("loginPage", {
      url: "/login",
      templateUrl: "views/templates/login.html",
      controller: 'MainController',
      controllerAs: 'login'
    })
    .state("homePage", {
      url: "/home",
      templateUrl: "views/templates/home.html",
      controller: 'RideController',
      controllerAs: 'ride'
    })
    .state("mainPage", {
      url: "/",
      templateUrl: "views/templates/main.html"
    })
    .state("registerPage", {
      url: "/register",
      templateUrl: "views/templates/register.html",
      controller: 'UserController',
      controllerAs: 'user'
    })
    .state("ridePage", {
      url: "/ride",
      templateUrl: "views/templates/addRide.html",
      controller: 'RideController',
      controllerAs: 'ride'
    })
    // .state('/login', {
    //   templateUrl: 'views/pages/login.html',
    // })

    $urlRouterProvider.otherwise('/')
}

// WAS IN HOME.HTML FILE
//  <!-- form to add computer to the list -->

// </div>

//   <h2> This is my message: </h2>
//   <!-- form to update the message variable using ng-model -->
//   <div class="form-group">
//     <label>Future Message Board</label>
//     <input type="text" class="form-control" ng-model="ride.room">
//   </div>
//   <h3>{{ride.room}}</h3>





