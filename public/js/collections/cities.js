app = app || {};

(function() {

  app.CityList = Backbone.Collection.extend({
    model: app.City,
    url: '/cities'
  });

  // app.cityList = new CityList();

})();