class MessageRelayJob < ApplicationJob
  def perform(message)
    comment =  MessagesController.render(partial: 'messages/message',
                                         locals: {message: message})
    ActionCable.server.broadcast "messages:#{message.id}:comments",
                                 comment: comment
  end
end
