module Api::V1

class PostsController < ApplicationController
    before_action :load_user, only: [:create, :destroy]
    # before_action :authenticate_user, only: [:create, :destroy, :index]

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
        post = []
        @posts.each do |i|
            arr.push(i.user_id)
        end
        arr.each do |i|
            @user = User.find(i)
            users.push({ username:@user.username, id:@user.id, avatar:@user.picture.url })
        end
        @posts.each do |i|
            post.push({
                id: i.id, 
                description: i.description,
                user_id: i.user_id, 
                created_at: i.created_at, 
                post_image: i.post_image,
                comments: Post.find(i.id).comments.count,
                likes: Post.find(i.id).likes.count
            })
        end
        render json: { posts: post, users: users, status: 200 }
    end

    def show_by_user
        @posts = Post.where(user_id: params[:user_id])
        post = []
        @posts.each do |i|
            post.push({
                id: i.id, 
                description: i.description,
                user_id: i.user_id, 
                created_at: i.created_at, 
                post_image: i.post_image,
                comments: Post.find(i.id).comments.count,
                likes: Post.find(i.id).likes.count
            })
        end
        render json: { posts: post, status: 200 }
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
            params.require(:post).permit(:user_id, :post_image, :description)
        end

        def load_user
            @user = User.find(params[:user_id])
        end
    end
end
