Rails.application.routes.draw do
  
  resources :products_categories
  resources :roles
  resources :user_roles
  resources :categories
  resources :products
  resources :reviews
  resources :users, only: [:index, :show, :update, :destroy]

  # Routes for OrderController
  resources :orders, only: [:index, :show, :destroy]
  post '/make_order', to: 'orders#new'
  

  # Routes for PaymentController
  resources :payments, only: [:index, :create]

  # Routes for AuthenticationController
  post '/create_account', to: 'authentication#create_account'
  post '/login_account', to: 'authentication#login_account'
  delete '/logout_account', to: 'authentication#logout_account'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
