class SurveyController < ApplicationController

  include SurveyHelper

  def index

    @survey_user = get_survey_user

    if @survey_user != nil

      @current_index = @survey_user.current_index
      @item = @survey_user.get_current_item
      @items_total = @survey_user.get_data.length
      @items_left = @items_total - @survey_user.current_index
    end

    @scripts_id = 'survey-index'
    render layout: 'survey'
  end
end