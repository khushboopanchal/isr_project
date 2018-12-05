//Init the geocoder library
var geocoder = new google.maps.Geocoder();

//array to hold the geo address
var geoAddress = [];

//function framework
directionsMap = {
	initNavigateMap: function (mapID, panelDirectionID, startLatitude, startLongitude, endLatitude, endLongitude) {
		var directionsDisplay = new google.maps.DirectionsRenderer;
		var directionsService = new google.maps.DirectionsService;
		
		//initialize the map
		var map = new google.maps.Map(document.getElementById(mapID), {
		  zoom: 7,
		  center: {lat: startLatitude, lng: startLongitude}
		}); 
		
		//clear the direction panel
		$("#" + panelDirectionID).html("");
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById(panelDirectionID));

		//prepare the latitude and longitude data
		start = startLatitude + ", " + startLongitude;
		end = endLatitude + ", " + endLongitude;
		directionsMap.calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
	},

	//function to get the driving route
	calculateAndDisplayRoute: function (directionsService, directionsDisplay, start, end) {
		directionsService.route({
		  origin: start,
		  destination: end,
		  travelMode: 'DRIVING'
		}, function(response, status) {
		  if (status === 'OK') {
			directionsDisplay.setDirections(response);
		  } else {
			alert('Directions request failed due to ' + status);
		  }
		});
	},

	//get geolocation based on address
	codeAddress: function (address) {
		return new Promise(function(resolve, reject){
			geocoder.geocode({ 'address': address }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					resolve(results);
				} else {
					reject(Error("Geocode for address " + address + " was not successful for the following reason: " + status));
				}
			});
		});
	},
	
	//function to get geolocation of both addresses.
	getGeolocationData: function(){
		if($("#txtStartingPoint").val() != "" && $("#txtDestinationPoint").val() != ""){
			geoAddress = [];
			directionsMap.codeAddress($("#txtStartingPoint").val()).then(function(response){
				var geoData = {
					latitude: response[0].geometry.location.lat(),
					longitude: response[0].geometry.location.lng()
				}
				geoAddress.push(geoData);
			}).then(function(){
				return directionsMap.codeAddress($("#txtDestinationPoint").val()).then(function(response){
					var geoData2 = {
						latitude: response[0].geometry.location.lat(),
						longitude: response[0].geometry.location.lng()
					}
					geoAddress.push(geoData2);
				});
				
			}).then(function(){
				directionsMap.initNavigateMap("map", "panel-direction", geoAddress[0].latitude, geoAddress[0].longitude, geoAddress[1].latitude, geoAddress[1].longitude);
			});
		}else{
			alert("Please enter both addresses");
		}
	},
	
	//clear entries and map display
	clearEntries: function(){
		$("#txtStartingPoint, #txtDestinationPoint").val("");
		$("#map, #panel-direction").html("");
	}
}
