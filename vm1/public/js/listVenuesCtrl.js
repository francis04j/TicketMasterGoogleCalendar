
var listVenuesCtrl = angular.module('listVenuesCtrl', ['geolocation', 'gservice']);
listVenuesCtrl.controller('listVenuesCtrl', function($scope, $http, $rootScope, geolocation, gservice){

$scope.savedVenues = [];
$http.get('/venues').success(function(response){
	
	for(var i= 0; i < response.length; i++) {
                var venue = response[i];
				
				$scope.savedVenues.push(venue);                
        }

}).error(function(response){
	console.log(response);
});

$scope.addToFavs = function(venueid){
    // your code here
    console.log(venueid);
};



});