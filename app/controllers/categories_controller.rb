class CategoriesController < ApplicationController

  def show
    if params[:brand_url].present?
      @category = Brand.where(url: params[:brand_url]).last
    else
      @category = Category.where(url: params[:id]).last
    end

    raise ActiveRecord::RecordNotFound if !@category.present?

    items_limit    = get_items_limit
    category_items = @category.items.where(is_published: true)
    order_filter   = get_order_filter
    gender_filter  = get_gender_filter
    current_page   = get_current_page

    category_items = if order_filter.nil?
      category_items.order("created_at desc")
    elsif order_filter == :from_lowest_price
      category_items.order("price asc")
    elsif order_filter == :from_highest_price
      category_items.order("price desc")
    end

    if gender_filter != :all
      if gender_filter == :unisex
        category_items = category_items.where(gender: "unisex")
      elsif gender_filter == :male
        category_items = category_items.where(gender: ["male", "unisex"])
      elsif gender_filter == :female
        category_items = category_items.where(gender: ["female", "unisex"])
      end
    end

    if items_limit != :all
      category_items = category_items.limit(items_limit).offset(get_current_offset)
    else
      category_items = category_items
    end

    current_params = {}
    if current_page > 1
      current_params = current_params.merge({ page: current_page })
    end
    if items_limit != 2
      current_params = current_params.merge({ limit: items_limit })
    end
    if !order_filter.nil?
      current_params = current_params.merge({ order: order_filter })
    end

    @items        = category_items
    @pages_total  = get_max_pages
    @page_current = get_current_page
    @items_limit  = items_limit
    @items_order  = order_filter
    @items_total  = @category.items.length
    @current_params = current_params

    # hack for displaying filter for watches only
    if Rails.env.production?
      @show_gender_filter = @category.id == 1
    elsif Rails.env.development?
      @show_gender_filter = @category.id == 1
    end

    @current_gender_filter = gender_filter

    @css_class_layout = 'm-page-category'
  end

  private

  def get_items_limit
    #limit = 25
    limit = limit_single
    if params[:limit].present?
      #if params[:limit] == "50"
      if params[:limit] == limit_double.to_s
        limit = limit_double
      elsif params[:limit] == "all"
        limit = :all
      end
    end
    limit
  end

  def get_current_page
    current_page = 1
    if params[:page]
        current_page = params[:page].to_f.floor
    end
    [1, [current_page, get_max_pages].min].max
  end

  def get_current_offset
    current_page = get_current_page
    items_limit  = get_items_limit

    if items_limit == :all
      0
    else
      (current_page - 1) * get_items_limit
    end
  end

  def get_max_pages
    items_limit = get_items_limit
    items_count = @category.items.length

    if items_limit == :all
      1
    else
      (items_count.to_f / items_limit.to_f).ceil
    end
  end

  def get_order_filter
    filter = nil
    if params[:order]
      if params[:order] == "from_lowest_price"
        filter = :from_lowest_price
      elsif params[:order] == "from_highest_price"
        filter = :from_highest_price
      end
    end
  end

  def get_gender_filter
    filter = :all
    if params[:gender]
      if params[:gender] == "unisex"
        filter = :unisex
      elsif params[:gender] == "male"
        filter = :male
      elsif params[:gender] == "female"
        filter = :female
      end
    end
    filter
  end

end
