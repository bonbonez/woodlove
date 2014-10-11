class AddAttachmentImagePromoToBrands < ActiveRecord::Migration
  def self.up
    change_table :brands do |t|
      t.attachment :image_promo
    end
  end

  def self.down
    remove_attachment :brands, :image_promo
  end
end
