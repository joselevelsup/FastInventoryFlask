angular.module("starter", ['TakeItEazy'])
.run(function(eazy){
  eazy.start();
})
.config(function($stateProvider, $urlRouterProvider){
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

.controller("mainCtrl", function($scope, $http, $state){

})
