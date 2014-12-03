Router.configure({
  loadingTemplate: 'loading',
  notFound: 'notFound'
});

Router.route('/:locationsLimit?', {
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('locations', { latMin: 0, latMax: 0, lngMin: 0, lngMax: 0});
  }
});
