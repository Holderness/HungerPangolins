var app = app || {};

(function($) {

  app.CityListView = Backbone.View.extend({

    el: '#funtimes',

    events: {
       "submit": 'addCity',
       "click .city-list": 'removeCity'
    },

    initialize: function() {
      this.collection = new app.CityList();
      this.collection.fetch({ reset: true });
      this.render();

      this.listenTo( this.collection, 'add', this.renderCity);
      this.listenTo( this.collection, 'reset', this.render );
    },

    render: function() {
      this.collection.each(function( city ) {
        this.renderCity( city );
      }, this);
    },

    renderCity: function( city ) {
      var cityView = new app.CityView({
        model: city
      });

      this.$('.city-list').append( cityView.render().el );
    },

    newAttributes: function() {
      return {
        name: this.$('#new-cityname').val(),
        description: this.$('#new-citydesc').val()
      };
    },
 
    addCity: function( e ) {
      e.preventDefault();
      this.collection.fetch( {data: this.newAttributes(), type: 'POST'} );
    },

    removeCity: function() {
      
    }

  });



})(jQuery);