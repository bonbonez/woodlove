class ApplicationController < ActionController::Base
  #before_filter :frontend_version

  protect_from_forgery

  def frontend_version
    frontend_version_file = YAML.load_file(File.join(Rails.root, "config/frontend_version.yml"))
    @frontend_version = frontend_version_file[:version]
  end
end
