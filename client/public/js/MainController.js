mainmangular.module('userApp')
  // $scope detects a route change and checks if our user is still logged in.
  // every different page = new check login's state
  .controller('MainController', function ($scope, $location, Auth) {
    var vm = this;


    // get info if a person is logged in
    // vm.loggedIn = Auth.isLoggedIn();
    // check to see if user is logged in on every request
    $scope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();

      // get user information on route change
      Auth.getUser()
        .success(function(data) {
          console.log(data)
          vm.user = data;
      })
    })

    // function to handle login form
    vm.doLogin = function() {
      // call the Auth.login() function
      // WHERE IS LOGINDATA from??
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
          console.log(data)
          // if a user successfully logs in, redirect to users page
          $location.path('/home');
      })
    }


    // function to handle logging out
    vm.doLogout = function() {
      console.log("I am logging out")

      Auth.logout();
      // reset all user info
      vm.user = {};
      $location.path('/');
    }

  })


  // {
  //   var vm = this;
  //   vm.name = "John";
  //   // make an API call

  // }
