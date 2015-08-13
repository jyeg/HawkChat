# json.(messages, :user, :content, :channel, :id) do
json.messages(ingredient) do |ingredient|
  json.item ingredient.item
  json.id ingredient.id
end
