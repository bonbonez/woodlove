class AddAttachmentPictureThumbToCategories < ActiveRecord::Migration
  def self.up
    change_table :categories do |t|
      t.attachment :picture_thumb
    end
  end

  def self.down
    remove_attachment :categories, :picture_thumb
  end
end
