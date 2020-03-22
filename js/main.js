

  
function initMap() {
    console.log("CALLED")
    infoWindow = new google.maps.InfoWindow();
  
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7.25,
      center: { lat: 7.8774, lng: 80.7003 },
      mapTypeControl: false,
      zoomControl: true,
      streetViewControl: false,
      clickableIcons: false,
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
        console.log(data);
        data["data"]["hospital_data"].forEach(e => {
            //geocodeAddress(geocoder, map,e["hospital"]["name"])
            temp1 = e["hospital"]["name"].replace(/ /g, "+");
            
            var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ temp1 +"+,Sri+Lanka&key=AIzaSyD_1pLrdnWTqffEjdCLOYOzLmXT3csejUI";
            //console.log(temp1)
          /*$.get( geoURL, function( data ) {
                console.log(this.temp1);
               createMarker(data, infoWindow);
            }(temp1));*/

            (function (t1){
              $.get( geoURL, (function( data ) {
               createMarker(data, infoWindow, t1);
            }));
            }(temp1))
            

           
            

           
           
        })
    });
    
    
  /*
    //initialize the geocoder
    var geocoder = new google.maps.Geocoder();
  
    //get data from the DB
    database
      .ref("world/")
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(plc) {
          //place marker for each location
          var marker = new google.maps.Marker({
            position: { lat: plc.val().lat, lng: plc.val().lng },
            map: map,
            placeID: plc.val().placeID,
            placeAddress: "",
            placeName: plc.val().placeName,
            animation: google.maps.Animation.DROP
          });
  
          //add marker click listener
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
  
            if (marker.placeAddress == "") {
              geocoder.geocode({ placeId: marker.placeID }, function(
                results,
                status
              ) {
                if (status !== "OK") {
                  window.alert("Geocoder failed due to: " + status);
                  return;
                }
                marker.placeAddress = results[0]["formatted_address"];
  
                //create the info window text
                contentString =
                  `<h5>` +
                  marker.placeName +
                  `</h5><div class="address">` +
                  marker.placeAddress +
                  `</div><bR><br><div class="text-center">
                            <button onclick="showPhotos('` +
                  marker.placeID +
                  `')" 
                            class="btn btn-primary">Show Photos</button></div>`;
                //create the Info Window
                infowindow = new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 200
                });
                infowindow.open(map, marker);
              });
            } else {
              //create the info window text
              contentString =
                `<h5>` +
                marker.placeName +
                `</h5><div class="address">` +
                marker.placeAddress +
                `</div><bR><br><div class="text-center">
            <button onclick="showPhotos('` +
                marker.placeID +
                `')" 
            class="btn btn-primary">Show Photos</button></div>`;
              //create the Info Window
              infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
              });
              infowindow.open(map, marker);
            }
          });
  
          //Save data from the DB to a local variable
          if (locationData[plc.val()["placeID"]] == undefined) {
            locationData[plc.val()["placeID"]] = { images: [] };
            for (var i = 0; i < plc.val()["images"].length; i++) {
              locationData[plc.val()["placeID"]]["images"].push({
                url: plc.val()["images"][i],
                author: plc.val()["author"]
              });
            }
            locationData[plc.val()["placeID"]]["district"] = plc.val()[
              "district"
            ];
            locationData[plc.val()["placeID"]]["placeName"] = plc.val()[
              "placeName"
            ];
          } else {
            for (var i = 0; i < plc.val()["images"].length; i++) {
              locationData[plc.val()["placeID"]]["images"].push({
                url: plc.val()["images"][i],
                author: plc.val()["author"]
              });
            }
          }
        });
        genStats(snapshot.val(), locationData, snapshot);
      });*/

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
  function createMarker(data, infowindow, place){
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
        
        Currently Treating: <b>34</b> 
          <ul type="circle">
            <li>Local: <b>30</b> </li>
            <li>Foreign: <b>4</b> </li>
          
        `;
       /* infowindow = new google.maps.InfoWindow({
          content: contentString,
        });*/
        infowindow.setContent(contentString)
        infowindow.open(map, marker);

      });
      
  }