angular.module('starter.services', [])

.factory('User', ['$timeout', function ($timeout) {
  var ref = new Firebase('https://as-authentication.firebaseIO.com/');
  //var auth = $firebaseSimpleLogin(ref);
  var user = {};

  return {
    login: function (email, password, callback) {
      ref.authWithPassword({
        'email': email,
        'password': password
      }, function (error, authData) {
        if(error) {
          console.log("login error: " + error);
          callback(error);
        }
        else {
          user.email = authData.password.email;
          user.token = authData.token;
          callback(user);
        }
      });
    },

    register: function (email, password, callback) {
      ref.createUser({
        'email': email, 
        'password': password
      }, function(error, userData) {
        if(error) {
          console.log("register error: " + error);
          callback(error);
        }
        else {
          user = userData;
          callback(userData);
        }
      });
    },

    getUser: function() {
      return user;
    },

    logout: function() {
      ref.unauth();
      user = {};
    }
  }
}]);
