Meteor.publish('locations', function(bounds) {
  check(bounds, Object);

  return Locations.find({loc: {$within: {$polygon: bounds}}});
});

Meteor.publish('items', function(bounds) {
  check(bounds, Object);

  return Items.find({loc: {$within: {$polygon: bounds}}});
});
