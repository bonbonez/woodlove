class AddPopulatiryPointsToItems < ActiveRecord::Migration
  def self.up
    add_column :items, :popularity_points, :integer, :default => 0
  end

  def self.down
    remove_column :items, :popularity_points
  end
end
