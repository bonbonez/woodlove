Woodlove::Application.routes.draw do

  root to: "index#index"

  get 'catalogue', to: 'catalogue#index'

  get 'subcategories/:url', to: 'subcategories#show'
  resources :subcategories

  resources :categories

  namespace :admin do
    root to: 'index#index'
    get 'let_me_in_please_im_a_cat', to: 'index#enable_admin_access'
    get 'let_me_in_please_im_a_dog', to: 'index#disable_admin_access'

    #get 'items/:id/edit', to: 'items#edit'
    resources :items
  end

  get '/items/:url', to: 'items#show'
  #resources :items #, only: :show

end
