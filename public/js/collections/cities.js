app = app || {};

(function() {

  var Cities = Backbone.Collection.extend({
    model: app.City

  });

  app.cities = new Cities();

})();