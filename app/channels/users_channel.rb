class UsersChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'userList'
    username.appear
  end

  def unsubscribed
    username.disappear
  end

  def appear(data)
    username.appear on: data['appearing_on']
  end

  def away
    username.away
  end
end
