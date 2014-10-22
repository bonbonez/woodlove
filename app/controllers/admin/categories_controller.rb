class Admin::CategoriesController < Admin::ApplicationController

    def index
      @categories = Category.all
    end

    def new
      @category = Category.new
      @header = "Новый Item"
      @link_back = admin_categories_path
    end

    def edit
      @category = Category.where(url: params[:id]).last
      @header = "Редактирование Category"
      @link_back = admin_categories_path
    end

    def create
      @category = Category.new(params[:category])
      @category.save!

      redirect_to admin_categories_path
    end

    def update
      @category = Category.where(url: params[:id]).last
      @category.update_attributes(params[:category])

      redirect_to admin_categories_path
    end

end