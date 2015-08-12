this.Messages = React.createClass({

  getInitialState: function() {

    return {
      username: this.props.username,
      messages: this.props.messages
    };

  },

  componentWillMount: function() {
    var _this = this;

    App.messages = App.cable.subscriptions.create('MessagesChannel', {
      received: function(data) {
        console.log(data);
        var messages = _this.props.messages.messages;
        messages.push(data);
        _this.setState({messages: messages});
      }
    });

    setTimeout( function(){
      App.messages.perform( "subscribed", {topic_id: window.topic.id} );
    },
    1000);
  },

  render: function() {
    var messageList = JSON.parse(this.props.messages);

    var listItems = messageList.messages.map(function(message){
      return <Message key={message.id} user={message.user} content={message.content} />;
    });

    return (
      <div>
        <h2>{ this.props.username }</h2>
        { listItems }
      </div>
    );
  },
  // <h2>{ window.topic.name }</h2>
  // <MessageForm topic={window.topic} />

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
