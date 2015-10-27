if (Meteor.isClient) {

  Meteor.startup(function() {
    gmaps.initialize();
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

  Template.mainMap.helpers({
    mainMapOptions: function() {
      return gmaps.loadOptions();
    }
  });

  Template.mainMap.onCreated(function() {

    GoogleMaps.ready('mainMap', function(map) {

      gmaps.map = map.instance;

      gmaps.initAutocomplete();

      //gmaps.plotRouteSegments();

    });

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
