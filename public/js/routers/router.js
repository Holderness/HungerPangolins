var app = app || {};

(function () {

	var CityRouter = Backbone.Router.extend({
    routes: {
      'routeexample': 'somemethod'
    },

    somemethod: function(param) {

    }
  });

  app.CityRouter = new CityRouter();
  Backbone.history.start();

})();