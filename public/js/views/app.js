var app = app || {};

(function ($) {

	app.AppView = Backbone.View.extend({

     el: '#funtimes',

     events: {
       "submit": 'formSubmit',
       "click .city-list": 'removeCity'
     },
     
     formSubmit: function() {
       alert('FormSub');
     },

     removeCity: function() {
       alert('WeeeDelete');
     }

	});

})(jQuery);