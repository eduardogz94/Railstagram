Rails.application.routes.draw do

    namespace :api do
        namespace :v1 do
            resources :users, only: [:index, :show] do
                member do
                    get :following, :followers
                end
                resources :posts do
                    resources :comments, only: [:create, :destroy]
                    resources :likes, only: [:create, :destroy]
                end
            end
            resources :relationships,       only: [:create, :destroy]

            get '/posts/:post_id/likes', to: 'likes#index'
            get '/posts/:post_id/comments', to: 'comments#index'

            get '/users/find/:username',   to: 'users#get'

            get '/user/:user_id/posts', to: 'posts#show_by_user'
            
            post '/signup',  to: 'users#create'
            post '/login',   to: 'users#log'
            
            patch '/edit/:id', to: 'users#update'
            
            delete '/edit/:id', to: 'users#destroy'

        end
    end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

