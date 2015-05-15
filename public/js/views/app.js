var app = app || {};

(function ($) {

	app.AppView = Backbone.View.extend({

     el: '#app',

     initialize: function() {

       new app.CityListView();
       
     },

	});

})(jQuery);