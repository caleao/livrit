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
