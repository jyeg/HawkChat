class MessagesController < ApplicationController
  def show
    @messages = Message.all
    render "messages/index.html.erb"
   end
  def create
    # MessagesChannel.message(params[:message][:body])
    # Question: is writing to AR or DB a good practice?
    puts "in messages controller"
    ActiveRecord::Base.connection_pool.with_connection do |conn|
      message = Message.create(content: params[:message][:content], user: cookies.signed[:username])
    end

    # TODO: can I call the Relay job from a controller?
    # MessageRelayJob.perform_later(params[:message][:body])
    ActionCable.server.broadcast 'messages',
      message: params[:message][:body],
      username: cookies.signed[:username]
    # head :ok
    # @messages = Message.all
    # render "messages/index.html.erb"
    render nothing: true
  end

end
