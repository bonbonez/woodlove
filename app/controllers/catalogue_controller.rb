class CatalogueController < ApplicationController

  def index
    @item = Item.first
  end

end