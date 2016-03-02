angular.module('rideService', [])
  .factory('Ride', function($http) {
    // create the object
    var rideFactory = {};

    // get a single user
    rideFactory.get = function(id) {
      return $http.get('http://localhost:3000/api/rides/' + id);
    };

    // get all rides
    rideFactory.all = function() {
      return $http.get('http://localhost:3000/api/rides/');
    };

    // create a user
    rideFactory.create = function(rideData) {
      return $http.post('http://localhost:3000/api/rides/', rideData);
    };

    // update a user
    rideFactory.update = function(id, rideData) {
      return $http.put('http://localhost:3000/api/rides/' + id, rideData);
    };

    // delete a user
    rideFactory.delete = function(id) {
      return $http.delete('http://localhost:3000/api/rides/' + id);
    };
    // return our entire rideFactory object
    return rideFactory;
  })
