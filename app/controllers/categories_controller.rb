class CategoriesController < ApplicationController

  def show
    @category = Category.where(url: params[:id]).last
    raise ActiveRecord::RecordNotFound if !@category.present?

    @category_items = @category.items
  end

end
