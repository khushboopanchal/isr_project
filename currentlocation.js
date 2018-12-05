/********************* START: CURRENT LOCATION **************************/
function currentLocation() {
  /******** MOHIT CHANGE 08-01-2018 ***************/
  if($(".storedetailspage").length){}
  else{  
    if (typeof google === 'object' && typeof google.maps === 'object') {
      setCurrentLocation();
    } else {
      $.getScript(googleapiurl).done(function() {
        setCurrentLocation();
      });
    }
  }
}

function setCurrentLocation() {
    geocoder = new google.maps.Geocoder();
    $('.allow-direction-box').addClass("active-box");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    window.dataLayer = window.dataLayer || [];
    blainGtmDataLayer.push({
        event: 'Allow Location Access'
    });
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    createCookie("currentloaction", myLatlng, 1);
    geocoder.geocode({
        'latLng': myLatlng
    }, function(results, status) {
        /*alert(status);*/
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                currentaddress = results[0].formatted_address;
                createCookie("currentloactionaddress", currentaddress, 1);
                createCookie("searchstate", "allowlocation", 1);
                $('.allow-direction-box').removeClass("active-box");
                console.log(readCookie("searchstate"));
                if (window.location == "https://stores-farmandfleet.web4cms.milestoneinternet.info/store-search") {
                    window.location.reload(1);
                } else {
                    window.location = "https://stores-farmandfleet.web4cms.milestoneinternet.info/store-search";
                }
                console.log("Read Cookies" + readCookie("currentloaction") + results[0].formatted_address);
            } else {
                $('.allow-direction-box').removeClass("active-box");
                alert('No results found');
            }
        } else {
            var error = {
                'TIMEOUT': 'The request to get user location timed out',
                'POSITION_UNAVAILABLE': 'Location information is unavailable',
                'PERMISSION_DENIED': 'User denied the request for Geolocation',
                'ZERO_RESULTS': 'We Could Not Find Your Address',
                'UNKNOWN_ERROR': 'An unknown error occurred'
            };
            $('#address_new').html('' + error[status] + '');
            $('.allow-direction-box').removeClass("active-box");
        }
    });
}

function showError(error) {
    blainGtmDataLayer.push({
        event: 'Dont Allow'
    });
    switch (error.code) {
        case error.PERMISSION_DENIED:
            if ($('#hdndevicetype').val() == 'mobile') {
                if (readCookie("denilocationcookie") == null) {
                    createCookie("denilocationcookie", "denilocation", 1);
                  /*  alert("You have denied the request for Share Location or Your Device having Locaion service off.");*/
                }
            } else {
                if (readCookie("denilocationcookie") == null) {
                    createCookie("denilocationcookie", "denilocation", 1);
                   /* alert("You have denied sharing your location.");*/
                }
            }
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
    $('.allow-direction-box').removeClass("active-box");
}
/********************* END: CURRENT LOCATION **************************/