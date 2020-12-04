const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getLocations', mid.requiresLogin, controllers.Location.getLocations);
  app.get('/getAllLocations', mid.requiresLogin, controllers.Location.getAllLocations);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/map', mid.requiresLogin, controllers.Location.mapPage);
  app.post('/map', mid.requiresLogin, controllers.Location.make);
  app.post('/search', mid.requiresLogin, controllers.Location.searchLocation);
  //app.get('/search', mid.requiresLogin, controllers.Location.getSearched);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
