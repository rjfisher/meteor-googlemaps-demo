Router.configure({
  layoutTemplate: 'home',
  loadingTemplate: 'loading',
  notFound: 'notFound'
});

Router.route('/', { name: 'map' });
Router.route('/about', { name: 'about' });
