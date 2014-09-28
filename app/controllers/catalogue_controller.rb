class CatalogueController < ApplicationController

  def index
    @item = Item.first
    @items_for_popular = [Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first]
    @categories = Category.all
  end

  #def show
  #  @category = Category.where(url: params[:url]).last
  #  raise ActiveRecord::RecordNotFound if !@category.present
  #end

  def url_processor
    url = params[:url]
    if Category.where(url: url).length > 0
      render action: :show, controller: :categories
    else
      raise ActiveRecord::RecordNotFound
    end
  end

end