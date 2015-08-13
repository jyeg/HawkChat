this.UsersList = React.createClass({
  // componentWillMount(){
  //   App.users = App.cable.subscriptions.create('UsersChannel', {
  //     subscribed:function(data) {
  //       console.log(data);
  //       var users = _this.props.users;
  //       users.push(data);
  //       _this.setState({users: users});
  //     },
  //
  //     appear:function() {
  //       // var messages = _this.props.messages.messages;
  //       // messages.push(data);
  //       // _this.setState({messages: messages});
  //     },
  //       // @perform 'appear', appearing_on: @appearingOn()
  //
  //     away: function(){
  //       // this.perform 'away'
  //     }
  //     // appearingOn: function(){
  //     //   $('main').data 'appearing-on'
  //     //   });
  //     // }
  // },
	render() {
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
	}
});
