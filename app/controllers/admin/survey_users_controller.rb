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

    def update_data
      items_ids = Item.where(category_id: 1).map{|i| i.id}
      users_items_ids = SurveyUser.last.get_data
      new_data = items_ids - users_items_ids

      SurveyUser.all.each do |survey_user|
        survey_user_data = survey_user.get_data
        new_data = items_ids - survey_user_data
        survey_user.data = (survey_user_data + new_data.shuffle).to_s
        survey_user.save!
      end

      #render nothing: true
      redirect_to admin_survey_users_path and return
    end

end