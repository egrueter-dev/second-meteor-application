if(Meteor.isServer){
  // Adding meteor Methods, these are called on the client side
  Meteor.methods({
    'insertPlayerData': function(playerNameVar) {
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer) {
      PlayersList.remove(selectedPlayer);
    },
    'addFivePoints': function(player_id) {
      PlayersList.update(player_id, {$inc: {score: 5}});
    },
    'removeFivePoints': function(player_id) {
      PlayersList.update(player_id, {$inc: {score: -5}});
    }
  });

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });
}
