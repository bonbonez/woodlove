class CreateBrands < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
