angular.module('userApp')
  .controller('RideController', function ($http, Ride, $scope, $location) {

  var vm = this;
  vm.currentRide;

  //show all posts
  Ride.all().success(function (data){
    vm.allRides = data;
    console.log("hello")
  })

  // Function makes spaces decrease by 1 with the + click
  vm.clickBoolean = true;
  vm.addRides = function (n) {
    console.log("hello")
    if(vm.clickBoolean) {
      for(var i=0; i<vm.allRides.length; i++){
        if(n === vm.allRides[i].name) {
          // subtracting space
          vm.allRides[i].space -= 1;
          // changing clickBoolean to false, so that only one user can join the space
          vm.clickBoolean = false;
          // setting the currentRide
          vm.currentRide = vm.allRides[i];
          // console.log(vm.currentRide)
          // adding the ride id as an argument
          vm.addRides2(vm.currentRide._id)
        }
      }
    }
  }

// allowing the addRides function to update the space into the backend
  vm.addRides2 = function(n) {
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/api/rides/' + n,
      data: {
        id: vm.currentRide.id,
        space: vm.currentRide.space
      }
    }).success(function(data) {
      alert(data);
    })
  }

  // function to create a post
  vm.newRide = function() {
    vm.processing = true;

    // use the create function in the rideService
    Ride.create(vm.rideData)
    .success(function(data) {
    vm.processing = false;
    // clear the form
    vm.rideData = {};
    //Ride to the page as soon as created
      Ride.all().success(function (data){
        // console.log(data.space)
        // console.log(data[7].space)
        vm.allRides = data;
        // takes you back to the rides home page
        $location.path('/home');
      })
    });
  };

  // $('#button').click(function(space) {
  //   space -= 1;
  // })
})
