class Admin::ItemsController < Admin::ApplicationController

  include ItemsHelper

  def index
    @items = Item.all.sort_by{|i|i.title}
    @categories = Category.all
  end

  def show
    redirect_to edit_admin_item_path(Item.last)
  end

  def new
    @item = Item.new
    @header = "Новый Item"
    @link_back = admin_items_path
  end

  def edit
    @item = Item.find(params[:id])
    @header = "Редактирование Item"
    @link_back = admin_items_path
  end

  def create
    @item = Item.new(params[:item])
    @item.save!

    redirect_to admin_items_path
  end

  def update
    @item = Item.find(params[:id])
    @item.update_attributes(params[:item])

    redirect_to admin_items_path
  end

  def delete
    #puts params
    #return;

    item = Item.find(params[:id])
    item.destroy if item.present?

    redirect_to admin_items_path
  end

  def destroy_picture
    item = Item.find(params[:id])

    if !item.nil?
      if params[:picture] == '1'
        item.picture.destroy
      else
        item["picture#{params[:picture]}"].destroy
      end
    end
    redirect_to action: :edit
  end

end