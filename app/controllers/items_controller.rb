class ItemsController < ApplicationController

  #include ApplicationHelper

  # GET /items
  # GET /items.json
  def index
    @items = Item.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
    end
  end

  # GET /items/1
  # GET /items/1.json
  def show
    #@item = Item.find(params[:id])
    @item = Item.where(url: params[:url]).last
    raise ActiveRecord::RecordNotFound if @item.nil?

    @scripts_id = 'item-show'
    @cart = get_user_cart

    @random_items = Item.where(category_id: @item.category.id).shuffle
    if @item.gender != nil
      @random_items = @random_items.select{|i| i.gender == @item.gender && i.id != @item.id}
    end

    @item_warranty = @item.brand.present? && @item.brand.warranty.present? ? @item.brand.warranty : nil
    @item_facts    = @item.facts_as_hash
    @item_meta     = @item.meta_as_hash

    add_item_to_recents

    #respond_to do |format|
    #  format.html # show.html.erb
    #  format.json { render json: @item }
    #end
  end

  # GET /items/new
  # GET /items/new.json
  def new
    @item = Item.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/1/edit
  def edit
    @item = Item.find(params[:id])
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(params[:item])

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "new" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.json
  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end

  private

  def add_item_to_recents
    if !session[:recently_viewed_items].present?
      session[:recently_viewed_items] = []
    end
    return if session[:recently_viewed_items].index(@item.id) != nil
    session[:recently_viewed_items].push(@item.id)
  end
end
