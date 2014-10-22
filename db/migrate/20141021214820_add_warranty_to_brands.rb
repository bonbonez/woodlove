class AddWarrantyToBrands < ActiveRecord::Migration
  def self.up
    add_column :brands, :warranty, :text
  end

  def self.down
    remove_column :brands, :warranty
  end
end
