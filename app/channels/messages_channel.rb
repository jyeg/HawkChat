# app/channels/messages_channel.rb
#Whenever a client subscribes to MessagesChannel,
#the #subscribed method is called, which starts streaming anything you broadcast to the “messages” stream.
class MessagesChannel < ApplicationCable::Channel
  chat = []
  def subscribed
    puts "i am in messages channel"
    stream_from 'messages'
  end
  def createMessage(data)
    #write to db?
    puts "i am in messages channel"
    Message.create(data);
  end
  def message(data)
   puts "i am in messages channel"
    message = nil

    ActiveRecord::Base.connection_pool.with_connection do |conn|
      message = Message.create(content: params[:message][:body], user: cookies.signed[:username])
    end
    ActionCable.server.broadcast "messages", render_message_html(message)
  end
  def render_message_html(message)
    MessageController.render(
      partial: 'message/message',
      locals: { message: message }
    )
  end
  # def userJoin
  #   stream_from 'users'
  # end
  # def userLeave
  #   remove
  # end
  # def follow(data)
  #   stop_all_streams
  #   stream_from "messages:#{data['message_id'].to_i}:comments"
  # end
  # def unfollow
  #   stop_all_streams
  # end
end
