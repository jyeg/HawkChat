class MessagesController < ApplicationController
  def create
    ActionCable.server.broadcast 'messages',
      message: params[:message][:body],
      username: cookies.signed[:username]
    head :ok
    @username = "test"
  end
  # def index
  #    @records = Record.all
  #  end
end
