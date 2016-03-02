angular.module('userApp')
  .controller('UserController', function ($http, User, $scope, Auth, $location) {
    var vm = this;

    vm.name = "meee"

    // more stuff to come soon

    User.all().success(function (data) {
      vm.allUser = data;
      console.log(vm.allUser)
      console.log("user initiated")
    })

  // creating new user
  vm.newUser = function() {
    // gets the createUser method from 'Auth' which is in authService.js
    Auth.createUser(vm.loginData.name, vm.loginData.email, vm.loginData.username, vm.loginData.password)
    .success(function(data) {
      // after it is created console.log then send the user to the /home page
      console.log(data)
      $location.path('/home');
    })
  }

    // function to create a new User
    // Don't need this to create a new user
  vm.addUser = function() {
    vm.processing = true;

    User.create(vm.allUser)
    .success(function(data) {
      vm.processing = false;
      // clear form
      vm.userData = {};
        User.all().success(function (data) {
          vm.allUser = data;
        })
      })
    }

  })


