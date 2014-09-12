class AddAttachmentPicture4ToItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :picture4
    end
  end

  def self.down
    remove_attachment :items, :picture4
  end
end
