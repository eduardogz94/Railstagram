class MessageBroadcastJob < ApplicationJob
    queue_as :default
  
    def perform(message)
      payload = {
        content: message.content,
        user_id: message.user_id,
      }
      ActionCable.server.broadcast(build_room_id(message.conversation.id), payload)
    end
    
    def build_room_id(id)
      "ChatRoom-#{id}"
    end
  end