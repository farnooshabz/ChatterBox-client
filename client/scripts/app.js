var App = {
  $spinner: $('.spinner img'),
  username: 'anonymous',
  currentRoom: 'general',
  initialize: function() {
    App.username = window.location.search.substr(10);
    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    setInterval(App.fetch, 3000);
  },
  fetch: function(callback = ()=>{}) {
    Parse.readAll(({result}) => {
      Messages.update(result, MessagesView.render);
      Rooms.update(result, RoomsView.render);

      callback();
    });
  },
  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },
  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
