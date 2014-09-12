class Admin::ApplicationController < ApplicationController
  before_filter :check_access, except: [:enable_admin_access, :disable_admin_access]

  layout 'admin'

  private

  def check_access
    unless cookies[:let_me_in_please_im_a_cat].present?
      raise ActiveRecord::RecordNotFound
    end
  end
end