class AddAttachmentPictureToSubcategories < ActiveRecord::Migration
  def self.up
    change_table :subcategories do |t|
      t.attachment :picture
    end
  end

  def self.down
    remove_attachment :subcategories, :picture
  end
end
