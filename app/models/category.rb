class Category < ActiveRecord::Base
  attr_accessible :name, :url, :weight, :picture_thumb, :picture_large

  has_attached_file :picture_thumb, :styles => { :default => "1000x1000>"}
  has_attached_file :picture_large, :styles => { :default => "300x300>"}

  validates_attachment_content_type :picture_thumb, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :picture_large, :content_type => /\Aimage\/.*\Z/

  has_many :subcategories
end
