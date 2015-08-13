this.MessageForm = React.createClass({
  componentWillMount:function(){
    App.messages = App.cable.subscriptions.create('MessagesChannel', {
      createMessage: function(data){
        console.log("in create message");
        App.users.perform( "message", "test");
      }
    });

  },
  submitMessage: function(e) {

    e.preventDefault();
    var message = React.findDOMNode(this.refs.message).value.trim();
    React.findDOMNode(this.refs.message).value = '';
    console.log("lets submit message!", message);
    App.messages.createMessage(message);
    // TODO: this perform to broadcast to a channel and add to repo.
    // this.props.add(message);
    // $.ajax({
    //   url: 'message/create',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: {message: {content: message}},
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //   }.bind(this)
    // });

  },

  render: function() {
    return (
      <form className="messageForm" onSubmit={this.submitMessage}>
        <br />
        Enter your message <br />
        <input name="content" type="text" ref="message" />
        <br />
        <input type="submit" />
      </form>
    );
  }
});
