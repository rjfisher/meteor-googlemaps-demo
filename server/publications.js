Meteor.publish('locations', function(bounds) {
  check(bounds, {
    latMin: Number,
    latMax: Number,
    lngMin: Number,
    lngMax: Number
  });

  return Locations.find({lat: {$gt: bounds.latMin, $lt: bounds.latMax},
    lng: {$gt: bounds.lngMin, $lt: bounds.lngMax}}, { sort: {name: 1} });
});
