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
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('mainMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
