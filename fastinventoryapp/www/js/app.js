angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/layout/login");

  $stateProvider
    .state("layout", {
      url: "/layout",
      abstract: true,
      templateUrl: "templates/layout.html"
    })
    .state("layout.login", {
      url: "/login",
      views:{
        "main-content":{
          templateUrl:"templates/login.html",
          controller: "loginCtrl"
        }
      }
    })
    .state("layout.home", {
      url: "/home",
      views:{
        "main-content":{
          templateUrl:"templates/home.html",
          controller: "mainCtrl"
        }
      }
    });
})

.controller("mainCtrl", function($scope, $state, $cordovaBarcodeScanner){
  $scope.room= "";
  $scope.scan = function(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        var count = 1;
        sendToDatabase(count);
      }, function(error) {
        alert("Messed Up");
      });
  }

  function sendToDatabase(count){
    MySql.Execute(
    "http://192.168.3.88:3306",
    "root",
    "skipmaster12",
    "fastinventory",
    "update inventory set quantity = "+count+" where modelNumber = "+$scope.model+" ",
    function(data){
      alert("Data added to Count");
      console.log(data.Error);
    });
  }

  $scope.logoutUser = function(){
    $state.go("layout.login");
  }
})

.controller("loginCtrl", function($scope, $state){
  $scope.user = {
    name: "",
    password: ""
  }

  $scope.loginUser = function(){
    if($scope.user.name == "jortiz3994" && $scope.user.password == "admin123"){
      $state.go("layout.home");
    }
  }


})
