
var listVenuesCtrl = angular.module('listVenuesCtrl', ['geolocation', 'gservice']);
listVenuesCtrl.controller('listVenuesCtrl', function($scope, $http, $rootScope, geolocation, gservice){

$scope.savedEvents = [];
var event1 = {};
$http.get('/events?venueid=KovZ91777af').success(function(response){
    event1 = response[0];
    event2 = response[1];
    event3 = response[2];
    for(var i= 0; i < response.length; i++) {
                        
        }
}).error(function(response){
    console.log(response);
});

$scope.savedVenues = [];
$http.get('/venues').success(function(response){
	
	for(var i= 0; i < response.length; i++) {
                var venue = response[i];
				
				$scope.savedVenues.push({
					venueid:venue.venueid,
				name:venue.name,
				postalcode: venue.postalcode,
				url: venue.url,
                evente:[event1,event2,event3]
				});                
        }

}).error(function(response){
	console.log(response);
});



});