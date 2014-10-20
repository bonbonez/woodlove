class Admin::SurveyUsersController < Admin::ApplicationController

    def index
      @survey_users = SurveyUser.all
    end

    def new
      @survey_user = SurveyUser.new
      @header = "Новый Survey User"
      @link_back = admin_survey_users_path
    end

    def edit
      @survey_user = SurveyUser.find(params[:id])
      @header = "Редактирование Survey User"
      @link_back = admin_survey_users_path
    end

    def create
      @survey_user = SurveyUser.new(params[:survey_user])
      @survey_user.save!

      redirect_to admin_survey_users_path
    end

    def update
      @survey_user = SurveyUser.find(params[:id])
      @survey_user.update_attributes(params[:survey_user])

      redirect_to admin_survey_users_path
    end

end