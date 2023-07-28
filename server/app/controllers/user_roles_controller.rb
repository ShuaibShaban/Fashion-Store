class UserRolesController < ApplicationController
    before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :user_role_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

    def create 
        if check_admin == true 
            user_role = UserRole.create!(user_role_params)
            if user_role.valid? 
                render json: user_role, status: :created
            else 
                render json:{error:"Invalid user_role detail"}, status: :unprocessable_entity
        
            end
        end  
     end
    
       def index 
        if check_admin == true 
            user_role =UserRole.all 
            render json: user_role, status: :ok
        end
      
       end
    
       def show 
        if check_admin == true 
            user_role = UserRole.find(params[:id])
            render json: user_role, status: :ok
        end
       end
    
       def update 
        if check_admin 
            user_role =UserRole.find(params[:id])
            user_role.update!(user_role_params)
            render json: user_role, status: :accepted
        end
        
       end

       def destroy 
        if check_admin 
            user_role=UserRole.find(params[:id])
            user_role.destroy 
            head :no_content
        end
        
       end
    
       private
    
       def user_role_params 
        params.permit(:user_id,:role_id)
       end

       def user_role_record_missing 
        render json: { "error": "User_role not found"}, status: :not_found
       end
    
       def validation_error 
        render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
       end
    
end
