gmaps = {

    // map object
    map: null,

    // google markers objects
    markers: [],

    // google lat lng objects
    latLngs: [],

    // our formatted marker data objects
    markerData: [],

    // intialize the map
    initialize: function() {
        //console.log("Intializing Google Maps...");
        GoogleMaps.load({
          key: Meteor.settings.public.googleAPIKey,
          libraries: 'places'
        });
    },

    loadOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          disableDefaultUI: true, // hide all controls,
          center: new google.maps.LatLng(-22.896041, -43.181506),
          zoom: 17
        };
      }
    },

    initAutocomplete: function() {

      //console.log('initAutocomplete map=', this.map);

      var input = document.getElementById('search-input');

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', this.map);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: gmaps.map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          gmaps.map.fitBounds(place.geometry.viewport);
        } else {
          gmaps.map.setCenter(place.geometry.location);
          gmaps.map.setZoom(17);  // Why 17? Because it looks good.
        }
        // @type {google.maps.Icon}
        marker.setIcon(({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map.instance, marker);
      });

    },

    plotRouteSegments: function(map) {

      // plotar polyline
      var routeSegment = [
        {lat: -22.896078, lng:-43.181556},
        {lat: -22.897288, lng:-43.182078}
      ];

      var routePath = new google.maps.Polyline({
        path: routeSegment,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map.instance
      })

    }
}
