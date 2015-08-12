# json.(messages, :user, :content, :channel, :id) do
json.messages(messages) do |message|
  json.user message.user
  json.content message.content
  json.channel message.channel
  json.id message.id
  # json.extract! comment, :id, :content
  # json.user do
  #   json.extract! comment.user, :id, :name
  # end
end
