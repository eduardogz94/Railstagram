Rails.application.routes.draw do
  
  get 'sessions/new'

  namespace :api do
    namespace :v1 do
      resources :users
        post    '/signup',  to: 'users#create'
        get    '/is_logged',   to: 'users#test'
        post   '/login',   to: 'users#log'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

