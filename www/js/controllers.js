angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('UserCtrl', ['$scope', 'User', 
function ($scope, User) {
  $scope.user = User.getUser();
  
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', ['$scope','$ionicPopup','$ionicLoading','$state','User', 
function($scope, $ionicPopup, $ionicLoading, $state, User) {
  $scope.user = User.getUser();

  $scope.login = function () {
    $ionicLoading.show();
    User.login($scope.user.email, $scope.user.password, function (res) {
      if (res.token) {
        $scope.user.email = res.email;
        $scope.user.token = res.token;

        $state.go('tab.account');
      }
      else {
        $ionicPopup.alert({
          title: 'Login Error',
          template: res.message
        });
      }

      $ionicLoading.hide();
    });
  }

  $scope.register = function () {
    User.register($scope.user.email, $scope.user.password, function (res) {
      if (res.uid) {
        $scope.user = res;
      }
      else {
        $ionicPopup.alert({
          title: 'Register error!',
          template: res.message
        });
      }
    });
  }

  $scope.logout = function () {
    User.logout();
    $scope.user = {};
  }
}]);
