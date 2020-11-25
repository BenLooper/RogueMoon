Rails.application.routes.draw do
  resources :owned_cards
  resources :cards
  resources :games
  resources :users

  post '/auth', to: 'auth#create'
  get '/auth', to: 'auth#known'
end
