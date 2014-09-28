Woodlove::Application.routes.draw do

  root to: redirect('/catalogue')

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
    resources :categories

    get 'items/:id/delete', to: 'items#delete', as: :delete
  end

  get '/items/:url', to: 'items#show'
  get '/categоries/:url', to: 'categories#show', as: :show
  #get '/:url', to: 'catalogue#url_processor'

  #resources :items #, only: :show

end
