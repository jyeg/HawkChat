class SessionsController < ApplicationController
  def create
    ActionCable.server.broadcast 'userList',
      username: params[:session][:username]
    cookies.signed[:username] = params[:session][:username]
    # @username =  params[:session][:username]
    @messages = Message.all
    render "messages/index.html.erb"
  end
end
