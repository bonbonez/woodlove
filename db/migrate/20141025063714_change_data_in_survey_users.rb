class ChangeDataInSurveyUsers < ActiveRecord::Migration
  def self.up
    change_column :survey_users, :data, :text
    change_column :survey_users, :data_liked, :text
    change_column :survey_users, :data_best, :text
  end

  def self.down
    change_column :survey_users, :data, :string
    change_column :survey_users, :data_liked, :string
    change_column :survey_users, :data_best, :string
  end
end
