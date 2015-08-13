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
          console.log("in connected users");
          setTimeout( function(){
            App.users.perform( "subscribed", {topic_id: 1} );
          },
          1000);
        },
        subscribed:function(data) {
          console.log("new User", data);
          var users = _this.props.users;
          users.push(data);
          _this.setState({users: users});
        },
        received: function(data) {
          console.log("in received users");
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
      received: function(data) {
        console.log("in receieved new message", data);
        var messages = _this.props.messages.messages;
        messages.push(data);
        _this.setState({messages: messages});
      },
      createMessage: function(data){
        console.log("in create message");
        App.users.perform( "message", "test");
      }
    });

    setTimeout( function(){
      console.log("in subscribed to message");
      App.messages.perform( "subscribed", {topic_id: 1} );
    },
    1000);
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
        <h2>name:{ this.props.username }</h2>
        { listItems }
        <MessageForm  onClick={App.createMessage}/>
      </div>
    );
  },
  // topic={window.topic}
  // <h2>{ window.topic.name }</h2>

  	_initialize(data) {
  		var {users, name} = data;
  		this.setState({users, user: name});
  	},

  	_messageRecieve(message) {
  		var {messages} = this.state;
  		messages.push(message);
  		this.setState({messages});
  	},

  	_userJoined(data) {
  		var {users, messages} = this.state;
  		var {name} = data;
  		users.push(name);
  		messages.push({
  			user: 'APPLICATION BOT',
  			text : name +' Joined'
  		});
  		this.setState({users, messages});
  	},

  	_userLeft(data) {
  		var {users, messages} = this.state;
  		var {name} = data;
  		var index = users.indexOf(name);
  		users.splice(index, 1);
  		messages.push({
  			user: 'APPLICATION BOT',
  			text : name +' Left'
  		});
  		this.setState({users, messages});
  	},

  	// _userChangedName(data) {
    // 		var {oldName, newName} = data;
    // 		var {users, messages} = this.state;
    // 		var index = users.indexOf(oldName);
    // 		users.splice(index, 1, newName);
    // 		messages.push({
    // 			user: 'APPLICATION BOT',
    // 			text : 'Change Name : ' + oldName + ' ==> '+ newName
    // 		});
    // 		this.setState({users, messages});
    // 	},
    //
  	// handleMessageSubmit(message) {
    // 		var {messages} = this.state;
    // 		messages.push(message);
    // 		this.setState({messages});
    // 		socket.emit('send:message', message);
    // 	},
    //
  	// handleChangeName(newName) {
    // 		var oldName = this.state.user;
    // 		socket.emit('change:name', { name : newName}, (result) => {
    // 			if(!result) {
    // 				return alert('There was an error changing your name');
    // 			}
    // 			var {users} = this.state;
    // 			var index = users.indexOf(oldName);
    // 			users.splice(index, 1, newName);
    // 			this.setState({users, user: newName});
    // 		});
    // 	},



});
