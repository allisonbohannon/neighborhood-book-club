Rails.application.routes.draw do

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  

  resources :relationships, only: [:index, :show, :create, :destroy]
  resources :messages, only: [:index, :show, :create, :destroy, :update]
  resources :book_club_members, , only: [:index, :show, :create, :update]
  resources :book_clubs, only: [:index, :show, :create, :update]
  resources :users, only: [:index, :show, :create, :destroy, :update] 
  resources :books, only: [:index, :show, :create, :update]
  resources :reading_lists, only: [:index, :show, :create, :destroy, :update]

  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post '/users/:id/follow', to: "users#follow", as: "follow_user"
  post '/users/:id/unfollow', to: "users#unfollow", as: "unfollow_user"

  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
