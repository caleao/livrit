
var Schema = {};

Schema.RouteSegment = new SimpleSchema({
  /*
  loc: {
    type: 'LineString',
    coordinates: [[{type: Number}, {type: Number}], [{type: Number}, {type: Number}]]
  },
  */
  createdAt: {
    type: Date
  }
  /*,
  createdBy: {
    type: User
  }*/
});

/*
,
// Add `roles` to your schema if you use the meteor-roles package.
// Option 1: Object type
// If you specify that type as Object, you must also specify the
// `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
// Example:
// Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
// You can't mix and match adding with and without a group since
// you will fail validation in some cases.
roles: {
type: Object,
optional: true,
blackbox: true
},
// Option 2: [String] type
// If you are sure you will never need to use role groups, then
// you can specify [String] as the type
roles: {
type: [String],
optional: true
}

});
*/
