class Api::CartController < Api::ApiController

  #include ApplicationHelper

  def get
    cart = self.get_user_cart
    render json: cart.data.to_json
  end

  def add_item
    cart = get_user_cart
    cart.add_item(params[:item][:id])
    render json: cart.get_data.to_json
  end

  def remove_item
    cart = get_user_cart
    cart.remove_item(params[:item][:id])
    render json: cart.get_data.to_json
  end

  def inc_item
    cart = get_user_cart
    cart.inc_item(params[:item][:id])
    render json: cart.get_data.to_json
  end

  def dec_item
    cart = get_user_cart
    cart.dec_item(params[:item][:id])
    render json: cart.get_data.to_json
  end

  #protected

  #def get_cart
  #  result = nil
  #  cart = cookies[:cart_token].present? ? Cart.where(cookie_id: cookies[:cart_token]).last : nil
  #  if !cart.present?
  #    cart = create_cart
  #  end
  #  cart
  #end

  #def create_cart
  #  cart = Cart.create
  #  cookies[:cart_token] = { value: cart.cookie_id, expires: 30.days.from_now }
  #  cart
  #end

end
