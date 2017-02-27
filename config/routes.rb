Rails.application.routes.draw do
  resources :countries, :only => [:index], :collection => { :states => [:get] }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => 'home#index'
end
