class AddFactsToItems < ActiveRecord::Migration
  def self.up
    add_column :items, :facts, :text
  end

  def self.down
    remove_column :items, :facts
  end
end
