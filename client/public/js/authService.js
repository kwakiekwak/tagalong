// main auth functions(login, logout, get current user, check if logged in)
// token auth functions(get the token, save the tkoen)
// auth interceptor(attach the toekn to HTTP requests, redirect if not logged in)
angular.module('authService', [])

// ================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ================================================
  .factory('Auth', function($http, $q, AuthToken){

    // create auth factory object
    var authFactory = {};

    // handle login
    // log a user in
    // The login will crete an $http.post() req to the endpoint on our NODE API
    authFactory.login = function(username, password) {
      // return the promise object and its data
      return $http.post('http://localhost:3000/api/authenticate', {
        username: username,
        password: password
      })
      .success(function(data) {
        AuthToken.setToken(data.token);
        return data;
      })
    }

    // Handle New Users
    // Will get called from the userController.js
    authFactory.createUser = function(name, email, username, password) {
      return $http.post('http://localhost:3000/api/users/', {
        name: name,
        email: email,
        username: username,
        password: password
      })
      .success(function(data) {
        return data;
      })
    }

    // handle logout
    // log a user out by clearing the token
    // logout will simply use the AuthToken factory to clear the token
    authFactory.logout = function() {
      // clear the token
      AuthToken.setToken();
    }

    // check if a user is logged in
    // checks if there is a local token
    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken())
        return true;
      else
        return false;
    }

    // get the user info
    // get the logged in user
    // will create an $http.get() req to the /me API endpoint to get the logged in user's info
    authFactory.getUser = function() {
      if (AuthToken.getToken())
        return $http.get('http://localhost:3000/api/me', {cache: true});
      else
        return $q.reject({message: 'User has no token'})
    }

    // return auth factory objct
    return authFactory
  })

  // ===============================================
  // factory for handling tokens
  // inject $window to store token client-side
  // ===============================================
  .factory('AuthToken', function($window) {

    var authTokenFactory = {};

    // get the token out of local storage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    }

    // function to set the token or clear the token
    // if a token is passed, set the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token) {
      if(token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };

    return authTokenFactory;
  })

  // ===============================================
  // application configuration to integrate token into requests
  // ===============================================
  .factory('AuthInterceptor', function($q, AuthToken, $location) {

    var interceptorFactory = {};

    // attach the token to every request
    // this will happen on all HTTP requests
    interceptorFactory.request = function(config) {
      // grab the token
      var token = AuthToken.getToken();
      // if the token exists, add it to the header as x-access-token
      if(token)
        config.headers['x-access-token'] = token;
      return config;
    }

    // redirect if a token doesn't authenticate
    // happens on response errs
    interceptorFactory.responseError = function(response) {
      // if our server returns a 403 forbidden response
      if(response.status == 403) {
        AuthToken.setToken();
        $location.path('/login');
        // return the erros from the server as a promise
      }
      return $q.reject(response);
    }
    return interceptorFactory;
  })

  // ====== NOTES on the interceptor in Angular //
  // request lets us intercept requests before they are sent
  // response lets us change the response that we get back from a request

