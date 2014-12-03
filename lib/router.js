Router.configure({
  loadingTemplate: 'loading',
  notFound: 'notFound',
  waitOn: function() {
    Meteor.subscribe('locations');
  }
});

Router.route('/', { name: 'home' });
