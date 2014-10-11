module CartHelper

  def item_control_config(item)
    return {}.to_json.to_s if item.nil?
    return {
      item: {
        id: item.id,
        price: item.price_to_use
      }
    }.to_json.to_s
  end

  def get_user_cart
    result = nil
    cart = cookies[:cart_token].present? ? Cart.where(cookie_id: cookies[:cart_token]).last : nil
    if !cart.present?
      cart = Cart.create
      cookies[:cart_token] = { value: cart.cookie_id, expires: 30.days.from_now }
    end
    cart
  end

end
