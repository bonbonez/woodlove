class AddWeightToCategories < ActiveRecord::Migration
  def self.up
    add_column :categories, :weight, :string
  end

  def self.down
    remove_column :categories, :weight
  end
end
