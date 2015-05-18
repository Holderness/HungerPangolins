var app = app || {};

(function() {

	app.City = Backbone.Model.extend({

		urlRoot: '/cities/',

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