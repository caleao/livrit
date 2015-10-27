if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load({
      key: Meteor.settings.public.googleAPIKey,
      libraries: 'places'
    });
  });

  Router.onBeforeAction(function() {
    if (! Meteor.userId()) {
      this.render('wellcome');
    } else {
      this.next();
    }
  });

  // Routes
  Router.route('/', function () {
    this.layout('appLayout');
    this.render('mainMap');
    this.render('sideBar', {to: 'sideBar'});
    this.render('navBar', {to: 'navBar'});
    this.render('userBar', {to: 'userBar'});
  });

  Template.wellcome.events({
    'click #facebook-login': function(event) {
      Meteor.loginWithFacebook({}, function(err){
        if (err) {
          throw new Meteor.Error("Facebook login failed");
        }
      });
    }
  });

  Template.sideBar.events({
    'click #logout': function(event) {
      Meteor.logout(function(err){
        if (err) {
          throw new Meteor.Error("Logout failed");
        }
      })
    }
  });

  Template.sideBar.rendered = function() {
    //$('head').append('<script type="text/javascript" src="js/sidebar.js"></script>');
  }


  Template.navBar.events({
    "click #sidebar-toggle": function(event, template){
      /*$("#wrapper").toggleClass("toggled");*/
      $("#wrapper").removeClass("toggled");
    }
  });

  Template.sideBar.events({
    "click #sidebar-hide": function(event, template){
      /*$("#wrapper").toggleClass("toggled");*/
      $("#wrapper").addClass("toggled");
    }
  });

  Template.mainMap.helpers({
    mainMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          disableDefaultUI: true, // hide all controls,
          center: new google.maps.LatLng(-22.896041, -43.181506),
          zoom: 17
        };
      }
    }
  });

  Template.mainMap.onCreated(function() {

    GoogleMaps.ready('mainMap', function(map) {

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

      // autocomplete
      var input = document.getElementById('search-input');

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map.instance);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map.instance,
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
          map.instance.fitBounds(place.geometry.viewport);
        } else {
          map.instance.setCenter(place.geometry.location);
          map.instance.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
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

    });

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
