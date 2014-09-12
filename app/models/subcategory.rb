class Subcategory < ActiveRecord::Base
  attr_accessible :name, :url, :picture
  belongs_to :category

  attr_accessible :picture
  has_attached_file :picture, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

  def to_param
    self.url
  end
end
