Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do 
      root 'users#index'
      get 'users/show'
      post 'users/create'
      patch 'users/update'
      delete 'users/destroy'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

