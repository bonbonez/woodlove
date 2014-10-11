module ItemsHelper

  def item_path(item)
    return "/items/#{item.url}"
  end

  def recently_viewed_items
    if session[:recently_viewed_items].present? && session[:recently_viewed_items].is_a?(Array)
      return Item.find(session[:recently_viewed_items])
    end
    return []
  end

end
