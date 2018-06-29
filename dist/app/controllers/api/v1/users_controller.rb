module Api::V1
  
  class UsersController < ApplicationController
    
    def index
      @users = User.all
      render json: @users
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end

    
    def create
      @user = User.new(user_params)
        if @user.save
          render json: @user
        else
          render 'new'
        end
    end
      
    def update
      @user = User.update(user_params)
      if @user.save
        render json: @user
      else
      end

    end

    def destroy  
      @user = User.delete(params[:id])
        if @user.save
          render json: @user
        else
          render 'false'
        end  
    end

    def user_params
      params.require(:user).permit(:username,:password,:password_confirmation)
    end

  end
end