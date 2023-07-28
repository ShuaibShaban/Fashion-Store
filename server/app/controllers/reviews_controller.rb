class ReviewsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index,:show]

    rescue_from ActiveRecord::RecordNotFound, with: :review_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

    def create 
        review = Review.new(reviews_params)
        review.user_id = @uid
        review.save
        if review.valid? 
            render json: review, status: :created
        else 
            render json:{error:"Invalid review detail"}, status: :unprocessable_entity
    
        end
       end
    
       def index 
        review =Review.all 
        render json: review, status: :ok
       end
    
       def show 
        review = Review.find(params[:id])
        render json: review, status: :ok
       end
    
       def update 
        review =Review.find(params[:id])
        if review.user_id == @uid 
            review.update!(reviews_params)
            render json: review, status: :accepted
        end
       end

       def destroy 
        review =Review.find(params[:id])
         if review.user_id == @uid 
            review.destroy 
            head :no_content
         end
       end
    
       private
    
       def reviews_params 
        params.permit(:comments,:rating,:product_id,:id)
       end
    
       def review_record_missing 
        render json: { "error": "Review not found"}, status: :not_found
       end
    
       def validation_error 
        render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
       end

end
