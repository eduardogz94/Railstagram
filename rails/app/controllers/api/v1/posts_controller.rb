module Api::V1

class PostsController < ApplicationController
    before_action :load_user, only: [:create, :destroy]

    def new
        @post = Post.new
        @user = User.find(params[:user_id])
    end

    def create
        @post = @user.posts.build(post_params)
        @post.post_image = "data:image/#{params[:type]};base64, #{params[:post_image]}"
        if @post.save!
            render json: { status: 200 }
        else
            render json: { err:@post, status: 403 }
        end
    end

    def index
        @posts = Post.all
        arr = []
        users = []
        @posts.each do |i|
            arr.push(i.user_id)
        end
        arr.each do |i|
            @user = User.find(i)
            users.push([username:@user.username, id:@user.id])
        end
        render json: { posts: @posts, users: users, status: 200 }
    end

    def destroy
        @user = User.find(params[:user_id])
        @post = Post.find(params[:id])
        if @post.destroy
            render json: { status: 200 }
        else 
            render json: { status: 500 }
        end
    end

    private
        def post_params
            params.require(:post).permit(:user_id, :post_image)
        end

        def load_user
            @user = User.find(params[:user_id])
        end
    end
end
