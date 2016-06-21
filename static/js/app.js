angular.module("starter", ['ui.bootstrap'])
.controller("mainCtrl", function($scope, $http){
  $scope.formStuff = {
    name: '',
    message: ''
  }
  $scope.sendToFlask = function(){
    $http.post("/postdata", $scope.formStuff, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .success(function(data){
      $scope.stuff = data;
    })
    .error(function(){
      console.log("Something happened");
    })
  }
})
