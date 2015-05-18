var App = angular.module('App', []);

App.controller('GetStats', ["$scope", "$http", function($scope, $http){
    $scope.player = {};
    $scope.allStats = [];

    var getAllStats = function() {
        return $http.get('/users/getStats').then(function(response){

            $scope.player = {};
            $scope.allStats = response.data;
            console.log($scope.allStats);
            console.log("inside length: ", $scope.allStats.length);
            return $scope.allStats.data;
        });
    };

    $scope.add = function(player) {
        return $http.post('/users/add', player).then(getAllStats());
    };

    getAllStats();
    console.log("Outside: ",$scope.allStats);
}]);