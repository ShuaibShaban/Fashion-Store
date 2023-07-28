class CategoriesController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]


    rescue_from ActiveRecord::RecordNotFound, with: :category_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

    def create 
        if check_admin == true
            category = Category.create!(category_params)
            if category.valid? 
                render json: category, status: :created
            else 
                render json:{error:"Invalid category detail"}, status: :unprocessable_entity
        
            end
        else
            render json: {error:"Unauthorized user - Not Admin"}
        end
        
       end
    
       def index 
        category =Category.all 
        render json: category, status: :ok
       end
    
       def show 
        category = Category.find(params[:id])
        render json: category, status: :ok
       end
    
       def update 
        
        if check_admin == true
          category =Category.find(params[:id])
          category.update!(category_params)
          render json: category, status: :accepted
        else 
            render json: {error:"Unauthorized User -Not Admin"}
        end
       
       end

       def destroy 

        if check_admin == true
            category =Category.find(params[:id])
            category.destroy 
            head :no_content
        else 
            render json: {error:"Unauthorized User -Not Admin"}
        end
       
       end
    
       private
    
       def category_params 
        params.permit(:name)
       end

       def category_record_missing 
        render json: { "error": "Category not found"}, status: :not_found
      end
    
       def validation_error 
        render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
       end
end
