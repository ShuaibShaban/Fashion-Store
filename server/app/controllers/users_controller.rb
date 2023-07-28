class UsersController < ApplicationController
   # before_action :verify_auth
    # skip_before_action :authorize_admin, only: [:show, :update]
     before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :user_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

   def index
    # user = User.find_by(id: @uid)
    user =User.all 
      if check_admin == true
        render json: user, status: :ok
      end   
   end

   def show 
    user = User.find_by(id: @uid)
    render json: user, status: :ok
   end

   def update 
    user = User.find_by(id: @uid)
    user.update!(user_params)
    render json: user, status: :accepted
   end

   def destroy 
    user =User.find(params[:id])
    if check_admin == true 
        user.destroy 
        head :no_content
    end
   end

   private

   def user_params 
    params.permit(:username, :password, :email)
   end

   def user_record_missing 
    render json: { "error": "User not found"}, status: :not_found
   end

   def validation_error 
    render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
   end

end
