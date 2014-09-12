class Item < ActiveRecord::Base
  attr_accessible :desc, :desc_original, :link_to_original_item, :meta, :price, :price_original, :price_special, :title, :title_original, :picture, :picture2, :picture3, :picture4, :picture5, :url

  has_attached_file :picture,  :styles => { :large => "450x300>", :medium => "300x200>", :thumb => "150x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :picture2, :styles => { :large => "450x300>", :medium => "300x200>", :thumb => "150x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :picture3, :styles => { :large => "450x300>", :medium => "300x200>", :thumb => "150x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :picture4, :styles => { :large => "450x300>", :medium => "300x200>", :thumb => "150x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :picture5, :styles => { :large => "450x300>", :medium => "300x200>", :thumb => "150x100>" }, :default_url => "/images/:style/missing.png"

  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

  include ApplicationHelper

  #def meta
  #  return nil if !is_valid_json(self[:meta])
  #  JSON.parse(self[:meta])
  #end

  #def meta(val)

  #end

  def meta_as_hash
    meta_raw = self[:meta]
    return nil if meta_raw.nil? || meta_raw.empty?
    meta_arr = []
    meta_raw.split(';').each do |meta_item|
      meta_item_parts = meta_item.split(':')

      if meta_item_parts.length > 1
        meta_arr << {
          name: meta_item_parts[0].strip.html_safe,
          value: meta_item_parts[1].strip.html_safe
        }
      end
    end
    meta_arr
  end

  def pictures
    pics_arr = []
    pics_arr << self.picture  if picture.present?
    pics_arr << self.picture2 if picture2.present?
    pics_arr << self.picture3 if picture3.present?
    pics_arr << self.picture4 if picture4.present?
    pics_arr << self.picture5 if picture5.present?
    pics_arr
  end

  #def to_param
  #  self.url
  #end

end
