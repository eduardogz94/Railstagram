module Api::V1
  class SessionsController < ApplicationController
    
    def test
      @session = logged_in?
      render json: @session
    end

    def show
      if !@current_user.nil?
        @current_user ||= User.find_by(id: session[:user_id])
        render json: @current_user
      else
        render json: 'No Current Session'
      end
    end

    def create
      @user = User.find_by(username: params[:session][:username].downcase)
      if @user && @user.authenticate(params[:session][:password])
        render json: @user
      else
        render json: 'Invalid email/password combination'
      end
    end
    
    def destroy
      @session = @session.delete(:user_id)
      render json: @session
    end


    
    private
      # Logs in the given user.
      def log_in(user)
        @session[:user_id] = @user.id
      end

      # Returns the current logged-in user (if any).
      def current_user
        @current_user ||= User.find_by(id: session[:user_id])
      end

      # Returns true if the user is logged in, false otherwise.
      def logged_in?
        !@current_user.nil?
      end

      # Remembers a user in a persistent session.
      def remember(user)
        user.remember
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:remember_token] = user.remember_token
      end
    
  end
end  
