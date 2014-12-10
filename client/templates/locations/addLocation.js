Template.addLocation.events({
  'submit form': function(e) {
    e.preventDefault();

    var name = $(e.target).find('[name=name]').val();
    var address = $(e.target).find('[name=address]').val();
    var city = $(e.target).find('[name=city]').val();
    var state = $(e.target).find('[name=state]').val();
    var zip = $(e.target).find('[name=zip]').val();

    var geocodeString = address + ' ' + city + ', ' + state + ' ' + zip;

    gmaps.geocodeAddress(geocodeString, function(latLng, address) {
      var lat = latLng.lat();
      var lng = latLng.lng();

      var location = {
        name: name,
        address: address,
        loc: {
          lon: lng,
          lat: lat
        },
        items: []
      }

      // Add to the collection here.
      Meteor.call('locationInsert', location, function(error, result) {
        if (error)
          return toastr.error('Location could not be saved. ' + error.reason);

        if (result.loExists)
          toastr.warning('This location has already been posted');

        Router.go('location', {_id: result._id});
      });
    });
  }
});
