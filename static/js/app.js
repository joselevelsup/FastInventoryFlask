angular.module("starter", ['TakeItEazy'])
.run(function(eazy){
  eazy.start();
})
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise("/layout/home");

  $stateProvider
    .state("layout", {
      url: "/layout",
      abstract: true,
      templateUrl: "/static/views/layout.html"
    })
    .state("layout.home", {
      url: "/home",
      page: {title: "Home"},
      views:{
        "content":{
          templateUrl: "static/views/homepage.html",
          controller:"mainCtrl"
        }
      }
    });
})

.controller("mainCtrl", function($scope, $http, $window){
  $scope.formStuff = {
    username: '',
    message: ''
  }
  $scope.sendToFlask = function(){
    $http.post("/post", $scope.formStuff, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .success(function(data){
      if(data == "passed"){
        $window.location.href ="/pass";
      }
      if(data == "failed"){
        $window.location.href ="/fail";
      }
    })
    .error(function(err){
      console.log("Something happened" + err);
    })
  }
})
