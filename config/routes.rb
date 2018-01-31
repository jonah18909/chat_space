Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resource :user, only: [:edit, :update]
  resource :groups, only: [:new, :create, :edit, :update] do
    resource :messages, only: [:index, :create]
  end


end
