class Admin::IndexController < Admin::ApplicationController

    def index
      render 'admin/index'
    end

    def enable_admin_access
      cookies[:let_me_in_please_im_a_cat] = { value: true, expires: 10.hour.from_now }
      render nothing: true
    end

    def disable_admin_access
      if cookies[:let_me_in_please_im_a_cat].present?
        cookies.delete :let_me_in_please_im_a_cat
      end
      render nothing: true
    end

end