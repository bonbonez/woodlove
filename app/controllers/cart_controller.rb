class CartController < ApplicationController

  def show
    @cart = get_user_cart

    @scripts_id = 'cart-index'
    @css_class_layout = 'm-page-category'
  end

end
