class UsersController < ApplicationController

  def show
  end


  def delete
  end

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
      
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # Handle a successful save.
    else
      render 'new'
    end

  end

  def user_params
    params.require(:user).permit(:username,:password,:password_confirmation)
  end

end
