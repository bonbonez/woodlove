class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.string :cookie_id
      t.string :data

      t.timestamps
    end
  end
end
