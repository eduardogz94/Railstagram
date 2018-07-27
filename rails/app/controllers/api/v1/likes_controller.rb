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
            render json: { status: 200 }
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
            render json: { status: 500}
        end
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