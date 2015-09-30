const {
  RaisedButton
} = mui;

const ThemeManager = new mui.Styles.ThemeManager();

App = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function () {
    return {
      selectedPlayerId: null
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getMeteorData() {
    return {
      players: Players.find({}, {
        sort: {
          score: -1,
          name: 1
        }
      }).fetch(),
      selectedPlayer: Players.findOne(this.state.selectedPlayerId)
    }
  },
  selectPlayer(playerId) {
    this.setState({
      selectedPlayerId: playerId
    });
  },
  addPointsToPlayer(playerId) {
    Players.update(playerId, {
      $inc: {
        score: 5
      }
    });
  },
  startRandom() {
    var intervalForRandomness = 0;
    throwRandomness = function () {
      intervalForRandomness = Meteor.setInterval(function () {
        Meteor.call('addRandomPoints');
      }, 100);
    };

    stopRandomness = function () {
      Meteor.clearInterval(intervalForRandomness);
    };
    Template.Layout.events({
      'click .inc': function (event) {
        if (!!intervalForRandomness) {
          stopRandomness();
          $(event.target).html('Start Randomness');
        } else {
          throwRandomness();
          $(event.target).html('Stop Randomness');
        }
      }
    });
  },
  render() {
    let bottomBar;
    if (this.state.selectedPlayerId) {
      bottomBar = (
        <div className="details">
          <div className="name">{`${this.data.selectedPlayer.name} ${this.data.selectedPlayer.surname}`}</div>
          <RaisedButton
            onClick={this.addPointsToPlayer.bind(
              this, this.state.selectedPlayerId)}
            style={{float: "right"}}
            label="Give 5 points"
            primary={true}/>
        </div>
      )
    } else {
      bottomBar = <div className="message">Choose a player</div>;
    }

    return (
      <div className="outer">
        <div className="logo"></div>
        <h1 className="title">Leaderboard</h1>
        <div className="subtitle">Select a businessman to give him points</div>
        <div style={{textAlign:"center"}} className="actions">
          <RaisedButton label="Start Randomness" />
        </div>
        <Leaderboard players={this.data.players}
          selectedPlayerId={this.state.selectedPlayerId}
          onPlayerSelected={this.selectPlayer} />
        { bottomBar }
      </div>
    )
  }
});
