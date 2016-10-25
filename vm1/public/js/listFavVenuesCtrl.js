
var listFavVenuesCtrl = angular.module('listFavVenuesCtrl', ['geolocation', 'gservice']);
listFavVenuesCtrl.controller('listFavVenuesCtrl', function($scope, $http, $rootScope, geolocation, gservice){

$scope.favVenues = [];
$http.get('/userFavVenues').success(function(response){
	
	for(var i= 0; i < response.length; i++) {
                var venue = response[i];
				console.log(venue.favvenues);
				$scope.favVenues=venue.favvenues;               
        }

}).error(function(response){
	console.log(response);
});

});