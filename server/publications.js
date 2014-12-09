Meteor.publish('locations', function(query) {
  check(query, Object);

  var bounds = query.bounds;
  if (bounds)
    return Locations.find({loc: {$within: {$polygon: bounds}}});

  var id = query.id;
  if (id)
    return Locations.find({_id: id});

  return Locations.find();
});
