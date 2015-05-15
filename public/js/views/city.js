var app = app || {};

(function() {

  app.CityView = Backbone.View.extend({

    el: '<li>',

    classname: 'city-container',

    template: _.template('<a href="/cities/<%= name %>"><%= name %></a>' +
        ' <a href="#" data-city="<%= name %>">' +
        '<img class="delete" src="/img/delete.png" width="15px"></a>'),

    events: {
      "click .delete": "removeCity",
    },

    initialize: function() {
      this.listenTo( this.model, 'destroy', this.remove() );
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );

      return this;
    },

    removeCity: function() {


    }



  });



})();