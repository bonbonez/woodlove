class Api::ItemsController < Api::ApiController

  include ItemsHelper

  def clear_recent
    if session[:recently_viewed_items].present?
      session[:recently_viewed_items] = nil
    end
    render json: {}
  end

end
