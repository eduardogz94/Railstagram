Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]

        get   '/users/find/:username',   to: 'users#get'
        get   '/users/id/:id',   to: 'users#show'
        
        post    '/signup',  to: 'users#create'
        post   '/login',   to: 'users#log'
        
        patch '/edit/:id', to: 'users#update'
        
        delete '/edit/:id', to: 'users#destroy'

    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

