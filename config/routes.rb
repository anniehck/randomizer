Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  root 'static_pages#index'

  namespace :api do
    resources :randoms, only: [:index, :new, :create]
  end
end
