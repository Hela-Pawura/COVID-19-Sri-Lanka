function initMap() {
    infoWindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7.25,
      center: { lat: 7.8774, lng: 80.7003 },
      mapTypeControl: false,
      zoomControl: true,
      streetViewControl: false,
      clickableIcons: false,
      gestureHandling: 'cooperative',
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#ff3e3e"
            },
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#191919"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    });
    var geocoder = new google.maps.Geocoder();
    
    $.get( "https://hpb.health.gov.lk/api/get-current-statistical", function( data ) {
        let updated = data["data"]["update_date_time"]
        updated =updated.replace(" ", "<br>")
        //set the home page values
        $("#local-cases").html(data["data"]["local_total_cases"])
        $("#local-recovered").html(data["data"]["local_recovered"])
        $("#local-deaths").html(data["data"]["local_deaths"])
        $("#in-observ").html(data["data"]["local_total_number_of_individuals_in_hospitals"]) // - data["data"]["local_total_cases"]
        
        $("#new-cases").html(data["data"]["local_new_cases"]);
        $("#new-deaths").html(data["data"]["local_new_deaths"]);
        $("#global-total").html(data["data"]["global_total_cases"]);
        $("#last-updated").html(updated);

        data["data"]["hospital_data"].forEach(e => {
            temp1 = e["hospital"]["name"].replace(/ /g, "+");
            
            var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ temp1 +"+,Sri+Lanka&key=AIzaSyCBxMG1dMTPzM0XmSMApl-LMPhIQgmHV7U";
   
            (function (t1, hospData){
              $.get( geoURL, (function( data ) {
               createMarker(data, infoWindow, t1, hospData);
            }));
            }(temp1,e))
                   
           
        })
    });
    
  
    //center to Sri Lanka if the center is moved
    map.addListener("center_changed", function() {
      if (map.zoom < 7.25) {
        window.setTimeout(function() {
          map.panTo({ lat: 7.8774, lng: 80.7003 });
        }, 1000);
      }
    });
  }
 

  //function to create a marker
  function createMarker(data, infowindow, place, hospData){
    place = place.replace(/\+/g," ")
    var marker = new google.maps.Marker({
        map: map,
        position: data["results"][0]["geometry"]["location"],
        icon: "./img/cross.png"
      });

      marker.addListener("click", function() {
        //close other info windows
        if (infowindow) {
          infowindow.close();
        }
        if (map.zoom < 11) {
          //zoom to marker
          map.setZoom(11);
          map.setCenter(marker.getPosition());
        }
        contentString =
        `<h3 class="place-head">`+ place +`</h3>
        
        On treatment/observation: <b>`+ hospData["treatment_total"]  +`</b> 
          <ul type="circle">
            <li>Local: <b>`+ hospData["treatment_local"] +`</b> </li>
            <li>Foreign: <b>`+hospData["treatment_foreign"] +`</b> </li>
          
        `;
      
        infowindow.setContent(contentString)
        infowindow.open(map, marker);

      });
      
  }
