module ApplicationHelper

  def frontend_version
    @frontend_version ||= begin
      frontend_version_file = YAML.load_file(File.join(Rails.root, "config/frontend_version.yml"))
      frontend_version_file["version"]
    end
  end

  def is_index?
    #params[:action] == "index" && params[:controller] == "index"
    params[:action] == "index" && params[:controller] == "catalogue"
  end

  def is_valid_json(obj)
    begin
      !!JSON.parse(obj)
    rescue
      false
    end
  end

end
