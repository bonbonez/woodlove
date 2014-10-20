module SurveyHelper

  def get_survey_user
    result = nil
    if self.survey_user_logged?
      result = SurveyUser.where(code: cookies[:b_survey_code]).last
    end
    result
  end

  def survey_user_logged?
    cookies[:b_survey_code].present?
  end

  def get_survey_item
    survey_user = get_survey_user
    if survey != nil

    end
  end
end
