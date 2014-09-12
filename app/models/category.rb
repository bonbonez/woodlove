class Category < ActiveRecord::Base
  attr_accessible :name, :url

  has_many :subcategories
end
