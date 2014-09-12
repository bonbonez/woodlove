class AddAttachmentPicture3ToItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :picture3
    end
  end

  def self.down
    remove_attachment :items, :picture3
  end
end
