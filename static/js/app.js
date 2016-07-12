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
      templateUrl: "/static/views/layout.html",
      controller:"mainCtrl"
    })
    .state("layout.home", {
      url: "/home",
      page: {title: "Home - Fast Inventory"},
      views:{
        "content":{
          templateUrl: "static/views/homepage.html"
        }
      }
    })
    .state("layout.add", {
      url: "/additem",
      page: {title: "Add Item - Fast Inventory"},
      views:{
        "content":{
          templateUrl: "static/views/addItem.html"
        }
      }
    });
})

.controller("mainCtrl", function($scope, $http, $state, $window){
  $http.get("/query")
    .success(function(data){
      // console.log(data);
      $scope.inventory = data;
    })
    .error(function(err){
      console.log("Messed Up "+err);
    });

})

function logout(){
  window.location = "/login";
}