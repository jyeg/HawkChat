# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # identified_by :username
    #
    # def connect
    #   self.current_user = find_verified_user
    # end
    #
    # protected
    #   def find_verified_user
    #     if current_user = (cookies.signed[:username])
    #       current_user
    #     else
    #       reject_unauthorized_connection
    #     end
    #   end
  end
end
