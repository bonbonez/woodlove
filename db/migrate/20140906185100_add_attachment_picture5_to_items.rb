class AddAttachmentPicture5ToItems < ActiveRecord::Migration
  def self.up
    change_table :items do |t|
      t.attachment :picture5
    end
  end

  def self.down
    remove_attachment :items, :picture5
  end
end
