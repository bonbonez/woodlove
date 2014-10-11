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
    resources :brands

    get 'items/:id/delete', to: 'items#delete', as: :delete
  end

  namespace :api, path: 'api' do
    get 'cart/get', to: 'cart#get'
    post 'cart/item/add', to: 'cart#add_item'
    post 'cart/item/remove', to: 'cart#remove_item'
    post 'cart/item/inc', to: 'cart#inc_item'
    post 'cart/item/dec', to: 'cart#dec_item'

    post 'items/recent/clear', to: 'items#clear_recent'
  end

  get '/items/:url', to: 'items#show'
  get '/categоries/:url', to: 'categories#show', as: :show
  get '/brands/:brand_url', to: 'categories#show', as: :show
  get '/cart', to: 'cart#show'
  #get '/:url', to: 'catalogue#url_processor'

  #resources :items #, only: :show

end
