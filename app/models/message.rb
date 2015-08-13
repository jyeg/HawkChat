class Message < ActiveRecord::Base
  # belongs_to :user
  # puts "in message record"
  # after_commit { MessageRelayJob.perform_later(self.content) }
end
