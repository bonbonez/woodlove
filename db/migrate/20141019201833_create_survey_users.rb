class CreateSurveyUsers < ActiveRecord::Migration
  def change
    create_table :survey_users do |t|
      t.string :name
      t.string :code
      t.string :data

      t.timestamps
    end
  end
end
