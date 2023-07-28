class RolesController < ApplicationController
  before_action :authorize

  rescue_from ActiveRecord::RecordNotFound, with: :role_record_missing
  rescue_from ActiveRecord::RecordInvalid, with: :validation_error

  def create
    if check_admin == true 
      role = Role.create!(role_params)
      if role.valid?
        render json: role, status: :created
      else
        render json: { error: "Invalid role detail" }, status: :unprocessable_entity
      end
    else 
      
    end
 
  end
  
  def index
    if check_admin == true 
      role = Role.all
      render json: role, status: :ok
    else 
      render json:{error:"Unauthorized user - Not Admin"}
    end
    
  end

  def show
    if check_admin = true 
      role = Role.find(params[:id])
      render json: role, status: :ok
    else 
      render json:{error:"Unauthorized user - Not Admin"}
    end
 
  end

  def update

    if check_admin == true 
      role = Role.find(params[:id])
      role.update!(role_params)
      render json: role, status: :accepted
    else 
      render json:{error:"Unauthorized user - Not Admin"} 
    end
  end

  def destroy
    if check_admin == true 
      role = Role.find(params[:id])
      role.destroy
      head :no_content
    else 
      render json:{error:"Unauthorized user - Not Admin"} 
    end
    
  end

  private

  def role_params
    params.permit(:name)
  end

  def role_record_missing
    render json: { "error": "role not found" }, status: :not_found
  end

  def validation_error
    render json: { "errors": ["validation errors"] }, status: :unprocessable_entity
  end
end
