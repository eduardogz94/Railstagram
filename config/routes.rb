Rails.application.routes.draw do

  get 'pages/home'

  get 'pages/contact'

  resources :users
  
  root 'users#index'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'


	

end
