this.Messages = React.createClass({

  getInitialState: function() {

    return {
      username: this.props.username,
      messages: this.props.messages
    };

  },
  updateUserList: function(users) {
     var message = JSON.parse(users);
     this.setState({users: users});
   },

  componentWillMount: function() {
    var _this = this;

    App.users = App.cable.subscriptions.create('UsersChannel', {
        connected:function(){
        //   console.log("in connected users");
        //   setTimeout( function(){
        //     App.users.perform( "subscribed", {topic_id: 1} );
        //   },
        //   1000);
        },
        subscribed:function(data) {
          console.log("new User", data);
          var users = _this.props.users;
          users.push(data);
          _this.setState({users: users});
        },
        received: function(data) {
          console.log("in received users", data);
          this.updateUserList(data.username);
        },

        updateUserList: this.updateUserList,
        appear:function() {
          // var messages = _this.props.messages.messages;
          // messages.push(data);
          // _this.setState({messages: messages});
        },
          // @perform 'appear', appearing_on: @appearingOn()

        away: function(){
          // this.perform 'away'
        }
        // appearingOn: function(){
        //   $('main').data 'appearing-on'
    });
    setTimeout( function(){
      console.log("in subscribed to users");
      App.users.perform( "subscribed");
    },
    1000);
        // }

    App.messages = App.cable.subscriptions.create('MessagesChannel', {
      connected:function(){
        console.log("in connected messages");
        setTimeout( function(){
          console.log(this);
          this.perform( "subscribed" );
        },
        1000);
      },
      received: function(data) {
        console.log("in receieved new message", data);
        var messages = _this.props.messages.messages;
        messages.push(data);
        _this.setState({messages: messages});
      },
      createMessage: function(data){
        console.log("in create message");
        this.perform( "message", "test");
      }
    });
  },

  render: function() {
    var messageList = JSON.parse(this.props.messages);
    console.log("users", this.state.users);
    var listItems = messageList.messages.map(function(message, index){
      return <Message key={message.id} user={message.user} content={message.content} />;
    });
    // <UsersList users={this.state.users}

    return (
      <div>
        <h2>Signed in as: { this.props.username }</h2>
        { listItems }
        <MessageForm  onClick={App.createMessage}/>
      </div>
    );
  }


});
