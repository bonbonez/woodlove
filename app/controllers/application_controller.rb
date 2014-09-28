class ApplicationController < ActionController::Base
  before_filter :frontend_version, :select_categories_for_top_meu

  protect_from_forgery

  def frontend_version
    frontend_version_file = YAML.load_file(File.join(Rails.root, "config/frontend_version.yml"))
    @frontend_version = frontend_version_file[:version]
  end

  def select_categories_for_top_meu
    @categories_for_top_menu = Category.all
  end
end
