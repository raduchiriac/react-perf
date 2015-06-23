var cx = React.addons.classSet;

var Leaderboard = ReactMeteor.createClass({
  // Specifying a templateName property allows the component to be
  // interpolated into a Blaze template just like any other template:
  // {{> Leaderboard x=1 y=2}}. This corresponds to the JSX expression
  // <Leaderboard x={1} y={2} />.
  templateName: "Players",

  getMeteorState: function() {
    var selectedPlayer = Players.findOne(Session.get("selected_player")),
      subscribedPlayers = Router.current().data().fetch();

    return {
      players: subscribedPlayers,
      selectedPlayer: selectedPlayer,
      selectedName: selectedPlayer && (selectedPlayer.name + ' ' + selectedPlayer.surname)
    };
  },

  addFivePoints: function() {
    Meteor.call("addPoints", Session.get("selected_player"), 5);
  },

  selectPlayer: function(id) {
    Session.set("selected_player", id);
  },

  renderPlayer: function(model) {
    var _id = this.state.selectedPlayer && this.state.selectedPlayer._id;

    return <Player
      key={model._id}
      name={model.name}
      surname={model.surname}
      score={model.score}
      phrase={model.phrase}
      className={model._id === _id ? "selected" : ""}
      onClick={this.selectPlayer.bind(this, model._id)}
    />;
  },

  componentDidMount: function() {
    document.body.appendChild(stats.domElement);
  },

  render: function() {
    var children = [
      <div className="leaderboard">
        { this.state.players.map(this.renderPlayer) }
      </div>
    ];

    if (this.state.selectedName) {
      children.push(
        <div className="details">
          <div className="name">{this.state.selectedName}</div>
          <input
            type="button"
            className="inc"
            value="Give 5 points"
            onClick={this.addFivePoints}
          />
        </div>
      );

    } else {
      children.push(
        <div className="none">Click a player to select</div>
      );
    }

    return <div className="inner">{ children }</div>;
  }
});

var Player = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState){
    var { name, surname, score, phrase, ...rest } = this.props;
    return name !== nextProps.name || score !== nextProps.score || rest.className !== nextProps.className;
  },
  render: function() {
    var { name, surname, score, phrase, ...rest } = this.props;
    return <div {...rest} className={cx("player", rest.className)}>
      <span className="name">{name} {surname}</span>
      <span className="score">{score}</span>
      <span className="phrase">{phrase}</span>
    </div>;
  }
});
