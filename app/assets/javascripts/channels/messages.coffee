# App.messages = App.cable.subscriptions.create 'MessagesChannel',
#   received: (data) ->
#     console log(data);
#     $('#messages').append @renderMessage(data)
#
#   renderMessage: (data) ->
#     console log(data);
#     "<p><b>[#{data.username}]:</b> #{data.message}</p>"
# App.messages = App.cable.subscriptions.create "MessagesChannel",
#   received: (data) ->
#       console log(data);
#       $('#messages').append(data.message)
