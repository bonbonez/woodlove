class Api::SurveyController < Api::ApiController

    include SurveyHelper

    def login
      if params[:code].present? && SurveyUser.where(code: params[:code]).length > 0
        cookies[:b_survey_code] = { value: params[:code], expires: 10.days.from_now }
        render json: {code: params[:code]}
      else
        render json: {error: true}, status: 409
      end

      #if !cookies[:b_survey_code].present? && params[:code].present?
      #  cookies[:b_survey_code] = { value: params[:code], expires: 10.days.from_now }
      #end

    end

    def next
      survey = get_survey_user
      if survey.nil?
        render json: {error: true}, status: 401
      end

      if params[:item_action] == "like"
        add_current_item_to_liked
        survey.increment_index
      elsif params[:item_action] == "best"
        add_current_item_to_best
        survey.increment_index
      elsif params[:item_action] == "next"
        survey.increment_index
      end


      next_item_html = if !survey.finished?
        render_to_string partial: 'survey/item', locals: {item: survey.get_current_item}
      else
        nil
      end

      render json: {
        next_item_html: next_item_html,
        finished: survey.finished?,
        total: survey.get_data.length,
        left: survey.get_data.length - survey.current_index
      }
    end

    def comment
      survey_user = get_survey_user
      if params[:comment].present? && survey_user != nil
        comment = Comment.create({text: params[:comment]})
        comment.survey_user = survey_user
        comment.item        = survey_user.get_current_item
        comment.save!

        render json: {
          success: true
        }
      end
    end

    private

    def add_current_item_to_liked
      survey_user = get_survey_user
      return false if survey_user == nil
      survey_user.add_to_data_liked(survey_user.get_current_item.id)
    end

    def add_current_item_to_best
      survey_user = get_survey_user
      return false if survey_user == nil
      survey_user.add_to_data_best(survey_user.get_current_item.id)
    end
end