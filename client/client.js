if(Meteor.isClient){
  // this code only runs on the client.
  Meteor.subscribe('thePlayers');

  Template.counter.helpers({
    count: function() {
      return PlayersList.find().count();
    }
  });

  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find({}, {sort : { score : 1, name: 1 }});
    },
    otherHelperFunction: function(){
      return "Some other function";
    },
    'selectedClass': function(){
      if(this._id == Session.get('selectedPlayer')) {
        return 'selected'
      }
    }
  });

  Template.body.events({
    'click .fiver': function(){
      var player_id = Session.get('selectedPlayer')
      Meteor.call('addFivePoints', player_id);
    },
    'click .fivedown': function(){
      var player_id = Session.get('selectedPlayer')
      Meteor.call('removeFivePoints', player_id);
    },
    'click .removePlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    },
    'submit form': function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar);
    }
  });

  Template.leaderboard.events({
    //events go here
    'click .player': function(event){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
  });
}


