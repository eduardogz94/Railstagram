module Api::V1

class PostsController < ApplicationController

    def new
        @post = Post.new
        @user = User.find(params[:user_id])
    end

    def create
        @post = @user.post.build(post_params)
        if @post.save
            render json: { status: 200 }
        else
            render json: { status: 403 }
        end
    end

    def index
        @posts = Post.all
        render json: { posts: @posts, status: 200 }
    end

    def show_by_user
        @posts = Post.where(user_id: params[:user_id])
        render json: { posts: @posts, status: 200 }
    end

    def destroy
        @user = User.find(params[:user_id])
        @post = Post.find(params[:id])
        if @post.destroy
            render json: { status: 200 }
        else 
            render json: { status: 200 }
        end
    end

    private
        def post_params
            params.require(:post).permit(:user_id, :post_image)
        end
    end
end
