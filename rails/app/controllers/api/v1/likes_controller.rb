module Api::V1

class LikesController < ApplicationController
    before_action :load_user, only: [:create, :destroy]

    def new
        @like = Like.new
        @user = User.find(params[:user_id])
    end

    def create
        @like = @user.likes.build(like_params)
        if @like.save!
            render json: { status: 200, like_id: @like.id }
        else
            render json: { err: @like, status: 403 }
        end
    end

    def index
        @likes = Like.where(post_id: params[:post_id])
        render json: { status: 200, likes: @likes }
    end

    def destroy
        @user = User.find(params[:user_id])
        @like = Like.find(params[:id])
        if @like.destroy
            render json: { status: 200 }
        else
            render json: { status: 500 }
        end
    end

    def check 
        @post = Post.find(params[:post_id]).likes
        users = []
        @post.each do |i|
            users.push({user:i.user_id, like_id:i.id})
        end
        liked = {status: false, like_id: ''}
        users.each do |i|
            if (i[:user] == Integer(params[:user_id])) 
                liked[:status] = true
                liked[:like_id] = i[:like_id]
            end
        end
        
        # liked = users.include?(:user => Integer(params[:user_id]))
        # if (liked)
        #     render json: { status: 200, liked: liked }
        # else
        # end
        render json: { liked: liked }
    end

    private
        def like_params
            params.permit(:post_id, :user_id)
        end
 
        def load_user
            @user = User.find(params[:user_id])
        end
    end
end