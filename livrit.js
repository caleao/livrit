if (Meteor.isClient) {

  Router.onBeforeAction(function() {
    if (! Meteor.userId()) {
      this.render('wellcome');
    } else {
      this.next();
    }
  });
  /*
  Router.configure({
    layoutTemplate: 'appLayout'
  });
  */

  // Routes
  Router.route('/', function () {
      this.layout('appLayout');
      this.render('livritNavigator');
      this.render('sidebarMenu', {to: 'sidebarNav'});
  });


  // counter starts at 0
  //Session.setDefault('counter', 0);

  /*
  Template.hello.helpers({
  counter: function () {
  return Session.get('counter');
}
});

Template.hello.events({
'click button': function () {
// increment the counter when button is clicked
Session.set('counter', Session.get('counter') + 1);
}
});
*/

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


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
