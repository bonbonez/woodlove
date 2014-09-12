class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :title_original
      t.text :desc
      t.text :desc_original
      t.string :meta
      t.integer :price
      t.integer :price_original
      t.integer :price_special
      t.string :link_to_original_item

      t.timestamps
    end
  end
end
