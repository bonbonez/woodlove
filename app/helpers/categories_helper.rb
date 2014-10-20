module CategoriesHelper

    def url_for_sort_by_price_asc
      get_url({order: :from_lowest_price})
    end

    def url_for_sort_by_price_desc
      get_url({order: :from_highest_price})
    end

    def url_for_limit_25
      get_url({limit: "2"})
    end

    def url_for_limit_50
      get_url({limit: "4"})
    end

    def url_for_limit_all
      get_url({limit: :all})
    end

    def get_next_page
      if @page_current < @pages_total
        page = @page_current + 1
        {
          url: get_url({page: page}),
          page: page
        }
      end
    end

    def get_prev_page
      if @page_current > 1
        page = @page_current - 1
        {
          url: get_url({page: page}),
          page: page
        }
      end
    end

    def get_gender_url(gender)
      {
        url: get_url({gender: gender})
      }
    end

    def link_to_gender_filter(gender)

    end

    def get_url(params)
      "#{request.path}?" + @current_params.merge(params).to_param
    end

end
