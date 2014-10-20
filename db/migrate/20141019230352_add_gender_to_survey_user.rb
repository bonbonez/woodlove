class AddGenderToSurveyUser < ActiveRecord::Migration
  def self.up
    add_column :survey_users, :gender, :string
  end

  def self.down
    remove_column :survey_users, :gender
  end
end
