class ApplicationController < ActionController::Base
  before_filter :frontend_version, :select_categories_for_top_meu, :cart_config

  include CartHelper

  protect_from_forgery

  def frontend_version
    frontend_version_file = YAML.load_file(File.join(Rails.root, "config/frontend_version.yml"))
    @frontend_version = frontend_version_file[:version]
  end

  def select_categories_for_top_meu
    @categories_for_top_menu = Category.all
  end

  def cart_config
    cart = cookies[:cart_token].present? ? Cart.where(cookie_id: cookies[:cart_token]).last : nil
    if !cart.present?
      cart = Cart.create
      cookies[:cart_token] = { value: cart.cookie_id, expires: 30.days.from_now }
    end
    @cart_config = cart.get_data
  end
end
