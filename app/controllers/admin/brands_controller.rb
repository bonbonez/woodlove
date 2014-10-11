class Admin::BrandsController < Admin::ApplicationController

    def index
      @brands = Brand.all
    end

    def new
      @brand = Brand.new
      @header = "Новый Brand"
      @link_back = admin_brands_path
    end

    def edit
      @brand = Brand.find(params[:id])
      @header = "Редактирование Brand"
      @link_back = admin_brands_path
    end

    def create
      @brand = Brand.new(params[:brand])
      @brand.save!

      redirect_to admin_brands_path
    end

    def update
      @brand = Brand.find(params[:id])
      @brand.update_attributes(params[:brand])

      redirect_to admin_brands_path
    end

end