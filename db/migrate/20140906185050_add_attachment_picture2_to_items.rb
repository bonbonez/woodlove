class AddAttachmentPicture2ToItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :picture2
    end
  end

  def self.down
    remove_attachment :items, :picture2
  end
end
