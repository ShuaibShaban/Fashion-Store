class ProductsCategoriesController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    rescue_from ActiveRecord::RecordNotFound, with: :product_categories_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

    def create 
        if check_admin == true
            procat = ProductsCategory.create!(procat_params)
          if procat.valid? 
             render json: procat, status: :created
          else 
             render json:{error:"Invalid product_category detail"}, status: :unprocessable_entity
          end
        else  
            render json:{error:"Unauthorized user - Not Admin"}
        end
       
       end
    
       def index 
        procat =ProductsCategory.all 
        render json: procat, status: :ok
       end
    
       def show 
        procat = ProductsCategory.find(params[:id])
        render json: procat, status: :ok
       end
    
       def update 
        if check_admin == true
            procat =ProductsCategory.find(params[:id])
            procat.update!(procat_params)
            render json: procat, status: :accepted
        else 
            render json: {error:"Unauthorized user - Not Admin"}
        end
        
        
       end

       def destroy 

        if check_admin ==true 
          procat =ProductsCategory.find(params[:id])
          procat.destroy 
          head :no_content
        else 
            render json: {error:"Unauthorized user - Not Admin"}
        end
       
       end
    
       private
    
       def procat_params 
        params.permit(:product_id,:category_id)
       end


  def product_categories_record_missing 
    render json: { "error": "Product_categories not found"}, status: :not_found
  end

   def validation_error 
    render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
   end
end
