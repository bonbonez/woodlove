class CatalogueController < ApplicationController

  def index
    @item = Item.first
    @items_for_popular = [Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first, Item.first]
    @categories = Category.all
  end

end