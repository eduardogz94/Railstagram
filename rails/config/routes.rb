Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show] do
        resources :posts
        end


        get '/users/find/:username',   to: 'users#get'

        get '/user/:user_id/posts', to: 'posts#user_posts'
        
        post '/signup',  to: 'users#create'
        post '/login',   to: 'users#log'
        
        patch '/edit/:id', to: 'users#update'
        
        delete '/edit/:id', to: 'users#destroy'

    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

