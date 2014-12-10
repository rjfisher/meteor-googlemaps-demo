Locations = new Mongo.Collection('locations');

Meteor.methods({
  locationInsert: function(locationAttrs) {
    check(Meteor.userId(), String);
    check(locationAttrs, {
      name: String,
      address: String,
      loc: Object,
      items: Array
    });

    var locWithSameAddress = Locations.findOne({address: locationAttrs.address});
    if (locWithSameAddress) {
      return {
        locExists: true,
        _id: locWithSameLink._id
      }
    }

    var user = Meteor.user();
    var location = _.extend(locationAttrs, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var id = Locations.insert(location);
    return { _id: id };
  }
});
