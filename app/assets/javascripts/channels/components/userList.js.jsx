this.UsersList = React.createClass({
  componentWillMount: function(){
    App.users = App.cable.subscriptions.create('UsersChannel', {
      subscribed:function(data) {
        console.log(data);
        var users = _this.props.users;
        users.push(data);
        _this.setState({users: users});
      },

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
      // }
  },
	render: function() {
		return (
			<div className='users'>
				<h3> Online Users </h3>
				<ul>
					{
						this.props.users.map((user, i) => {
							return (
								<li key={i}>
									{user}
								</li>
							);
						})
					}
				</ul>
			</div>
		);
	},
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
	}
});
