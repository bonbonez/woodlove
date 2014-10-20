class Comment < ActiveRecord::Base
  attr_accessible :item_id, :survey_user_id, :text

  belongs_to :item
  belongs_to :survey_user
end
