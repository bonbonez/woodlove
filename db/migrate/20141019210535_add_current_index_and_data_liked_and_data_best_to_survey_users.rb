class AddCurrentIndexAndDataLikedAndDataBestToSurveyUsers < ActiveRecord::Migration
  def self.up
    add_column :survey_users, :current_index, :integer, default: 0
    add_column :survey_users, :data_liked, :string, default: "[]"
    add_column :survey_users, :data_best, :string, default: "[]"
  end

  def self.down
    remove_column :survey_users, :current_index
    remove_column :survey_users, :data_liked
    remove_column :survey_users, :data_best
  end
end
