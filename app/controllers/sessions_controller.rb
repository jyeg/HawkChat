class SessionsController < ApplicationController
  def create
    cookies.signed[:username] = params[:session][:username]
    @username =  params[:session][:username]
    @messages = Message.all
    render "messages/index.html.erb"
    @username = "session"
  end
end
