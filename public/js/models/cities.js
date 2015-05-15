var app = app || {};

(function() {

	app.City = Backbone.Model.extend({

		url: '/cities',

    defaults: {
			name: '',
			description: ''
		},

		parse: function( res ) {
      return {
        name: res
      };
		}

  });


})();