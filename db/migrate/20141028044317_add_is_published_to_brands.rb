class AddIsPublishedToBrands < ActiveRecord::Migration
  def self.up
    add_column :brands, :is_published, :boolean, :default => true
  end

  def self.down
    remove_column :brands, :is_published
  end
end
