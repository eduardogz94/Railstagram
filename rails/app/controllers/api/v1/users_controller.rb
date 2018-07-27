module Api::V1
  
  class UsersController < ApplicationController
  
    before_action :set_user, only: [:log]
    before_action :get_user, only: [:get]

    def index
      @users = User.all
      render json: { user: @users , status: 200 }
    end

    def show
      @user = User.find(params[:id])
      @posts = @user.posts
      if @user.valid?
        render json: { user:@user, posts:@posts, status: 200 }
      else 
        render json: { data: 'No user found' , status: 404}
      end
    end

    def get
      if @user
        render json: { user:@user , status: 200 }
      else 
        render json: { data: 'No user found' , status: 404 }
      end
    end

    def log
        if @user
          puts @user
        render json: { user:@user , status: 200 }
      else 
        render json: { data: 'No user found' , status: 404 }
      end
    end

    def create
      @user = User.new(user_params)
      @user.picture = "data:image/#{params[:type]};base64, #{params[:picture]}"
      if @user.save! 
          render json: { data: 'User created', id:@user.id, status: 200 }
        else 
          render json: { data:@user.errors, status: 400 }
        end       
    end
      
    def update
      @user = User.update_attributes(user_params)
      if @user.save
          render json: { data: 'User updated' , status: 200 }
        else 
          render json: { data:@user.errors , status: 403 }
        end
    end

    def destroy  
      @user = User.destroy(params[:id])
        if @user.save
          render json: { data: 'User Deleted' , status: 200 }
        else 
          render json: { data: 'No user found' , status: 404 }
        end
    end
    
    def following
      @user  = User.find(params[:id])
      @users = @user.following
      render json: { status: 200, following: @users }
    end
  
    def followers
      @user  = User.find(params[:id])
      @users = @user.followers
      render json: { status: 200, followers: @users }
    end
    private 

    def user_params
      params.require(:user).permit(:username, :password_digest, :picture)
    end

    def set_user
      @user = User.find_by(username: params[:username], password_digest: params[:password])
    end

    def get_user
      @user = User.where("username like ?", "%#{params[:username]}%")
    end

  end
end