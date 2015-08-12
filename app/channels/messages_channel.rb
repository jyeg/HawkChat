# app/channels/messages_channel.rb
#Whenever a client subscribes to MessagesChannel,
#the #subscribed method is called, which starts streaming anything you broadcast to the “messages” stream.
class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end
  # def follow(data)
  #   stop_all_streams
  #   stream_from "messages:#{data['message_id'].to_i}:comments"
  # end

  def unfollow
    stop_all_streams
  end
end
