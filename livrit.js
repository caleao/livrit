if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load({key: Meteor.settings.public.googleAPIKey});
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
    this.render('livritNavigator');
    this.render('sidebarMenu', {to: 'sidebarNav'});
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

  Template.sidebarMenu.events({
    'click #logout': function(event) {
      Meteor.logout(function(err){
        if (err) {
          throw new Meteor.Error("Logout failed");
        }
      })
    }
  });


  Template.livritNavigator.events({
    "click #menu-toggle": function(event, template){
      $("#wrapper").toggleClass("toggled");
    }
  });

  Template.livritNavigator.helpers({
    mainMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(-22.896041, -43.181506),
          zoom: 17
        };
      }
    }
  });

  Template.livritNavigator.onCreated(function() {

    GoogleMaps.ready('mainMap', function(map) {

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
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
