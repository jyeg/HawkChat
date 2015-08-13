class MessageRelayJob < ApplicationJob
  def perform(message)
    # puts "relay job"

    # comment =  MessagesController.render(partial: 'messages/message',
    #                                      locals: {message: message})
    # puts comment
    ActionCable.server.broadcast "messages",
                                 message: message
  end
end
