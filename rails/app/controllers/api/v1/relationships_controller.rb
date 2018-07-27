module Api::V1
    
    class RelationshipsController < ApplicationController
        
        def create
            @followed = User.find(params[:followed_id])
            @follower = User.find(params[:follower_id])
            if @follower.follow(@followed)
                render json: { status: 200 }
            else
                render json: { status: 500}
            end    
        end
    
        def destroy
            @followed = User.find(params[:followed_id])
            @follower = User.find(params[:follower_id])
            if @follower.unfollow(@followed)
                render json: { status: 200 }
            else
                render json: { status: 500 }
            end          
        end
    end
end