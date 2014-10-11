class Brand < ActiveRecord::Base
  attr_accessible :url, :name, :description, :title, :logo, :image_promo

  has_many :items
  #belongs_to :category

  has_attached_file :logo,  :styles => { :default => "330x70>" }
  has_attached_file :image_promo,  :styles => { :default => "1880x455>" }

  validates_attachment_content_type :logo, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :image_promo, :content_type => /\Aimage\/.*\Z/

  def header
    self.title
  end

end
