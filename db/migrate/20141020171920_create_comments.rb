class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :survey_user_id
      t.integer :item_id
      t.string :text

      t.timestamps
    end
  end
end
