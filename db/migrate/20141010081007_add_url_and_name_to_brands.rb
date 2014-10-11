class AddUrlAndNameToBrands < ActiveRecord::Migration
  def self.up
    add_column :brands, :url, :string
    add_column :brands, :name, :string
  end

  def self.down
    remove_column :brands, :url
    remove_column :brands, :name
  end
end