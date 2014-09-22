class AddAttachmentPictureLargeToCategories < ActiveRecord::Migration
  def self.up
    change_table :categories do |t|
      t.attachment :picture_large
    end
  end

  def self.down
    remove_attachment :categories, :picture_large
  end
end
