Router.configure({
  layoutTemplate: 'home',
  loadingTemplate: 'loading',
  notFound: 'notFound'
});

Router.route('/', { name: 'map' });

Router.route('/about', { name: 'about' });

Router.route('/locations/:_id', {
  name: 'location',
  waitOn: function() {
    return Meteor.subscribe('locations', { id: this.params._id, bounds: null});
  },
  data: function() {
    return Locations.findOne(this.params._id);
  }
});
