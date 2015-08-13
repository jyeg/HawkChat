class MessagesController < ApplicationController
  def create
    # MessagesChannel.message(params[:message][:body])
    ActiveRecord::Base.connection_pool.with_connection do |conn|
      message = Message.create(content: params[:message][:body], user: cookies.signed[:username])
    end
    ActionCable.server.broadcast 'messages',
      message: params[:message][:body],
      username: cookies.signed[:username]
    # head :ok
    @messages = Message.all
    render "messages/index.html.erb"
  end
  # def index
  #    @records = Record.all
  #  end
end
