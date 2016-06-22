angular.module("starter", ['TakeItEazy'])
.controller("mainCtrl", function($scope, $http){
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
      console.log(data);
    })
    .error(function(err){
      console.log("Something happened" + err);
    })
  }
})
