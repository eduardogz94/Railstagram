module Api::V1
    class ConversationsController < ApplicationController

        def exists
            convs = Conversation.all
            arr = []
            convs.each do |i|
                if (i.participant != nil) 
                    if (i.participant.include?(Integer(params[:sender_id])))
                        arr.push(i)
                    end
                end
            end

            room_id = nil
            arr.each do |i|
                if (i.participant.include?(Integer(params[:receiver_id])))
                    room_id = i.id
                end
            end

            if (room_id == nil) 
                render json: { status: 404, room_id: nil }
            else 
                render json: { status: 200, room_id: room_id  }
            end
        end

        def history
            conversation = Conversation.find(params[:room_id])
            if (conversation != nil) 
                history = [] 
                conversation.messages.each do |i|
                    history.push({id: i.user_id, msg: i.content, date:i.created_at})
                end 
                render json: { status: 200, history: history }
            else
                render json: { status: 404 }
            end
        end

        def create
            puts params[:sender_id]
            puts params[:receiver_id]
            conversation = Conversation.create(participant: [ Integer(params[:sender_id]), Integer(params[:receiver_id])])
            if conversation.save
                render json: { status: 200, id: conversation.id }
            else 
                render json: { status: 404 }
            end
        end

    end
end




