if (Meteor.isClient) {

  Template.navBar.events({
    "click #sidebar-toggle": function(event, template){
      toggleSidebar();
    }
  });

  Template.sideBar.events({
    "click #sidebar-hide": function(event, template){
      toggleSidebar();
    },
    "click #sidebar-overlay": function(event, template){
      toggleSidebar();
    }
  });

  function toggleSidebar() {
      $("#wrapper").toggleClass("toggled");
      //console.log('sidebar toggled');
  }
}
