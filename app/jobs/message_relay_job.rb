class MessageRelayJob < ApplicationJob
  def perform(message)
    print "relay job"

    comment =  MessagesController.render(partial: 'messages/message',
                                         locals: {message: message})
    print comment
    ActionCable.server.broadcast "messages",
                                 message: message
  end
end
