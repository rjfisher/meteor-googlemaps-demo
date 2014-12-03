Router.configure({
  loadingTemplate: 'loading',
  notFound: 'notFound'
});

Router.route('/', { name: 'home' });
