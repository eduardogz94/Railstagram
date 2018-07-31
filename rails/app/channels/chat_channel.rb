# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
    # Called when the consumer has successfully
    # become a subscriber to this channel.
    def subscribed
        stream_from("ChatRoom-#{(params[:room_id])}")
    end

    def send_message(data)
        Message.create!(content: data['content'])
    end
  end