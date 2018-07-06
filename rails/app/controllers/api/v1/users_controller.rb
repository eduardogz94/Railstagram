module Api::V1
  
  class UsersController < ApplicationController
    
    def index
      @users = User.all
      render json: { user:@users , status: '200' }
    end

    def show
      @user = User.find(params[:id])
      if @user.valid?
        render json: { user:@user , status: '200' }
      else 
        render json: { data: 'No user found' , status: '404' }
      end
    end

    def create
      @user = User.new(user_params)
        if @user.save
          render json: { data: 'User created' , status: '200' }
        else 
          render json: { data:@user.errors, status: '400' }
        end     
    end
      
    def update
      @user = User.update_attributes(params[:username, :password, :password_confirmation])
      if @user.save
          render json: { data: 'User updated' , status: '200' }
        else 
          render json: { data:@user.errors , status: '403' }
        end
    end

    def destroy  
      @user = User.destroy(params[:id])
        if @user.save
          render json: { data: 'User Deleted' , status: '200' }
        else 
          render json: { data: 'No user found' , status: '404' }
        end
    end


    
    private 

    def user_params
      params.require(:user).permit(:username, :password, :password_confirmation)
    end

  end
end