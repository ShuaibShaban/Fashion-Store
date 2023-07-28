class ProductsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    rescue_from ActiveRecord::RecordNotFound, with: :product_record_missing
    rescue_from ActiveRecord::RecordInvalid, with: :validation_error

  def create
    if check_admin == true 
      product = Product.create!(product_params)
      if product.valid?
        render json: product, status: :created
      else
        render json: { error: "Invalid product detail" }, status: :unprocessable_entity
      end
    else 
      render json:{error:"Unauthorized user - Not Admin"}
    end
    
  end

  def index
    product = Product.all
    render json: product, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, status: :ok
  end

  def update

    if check_admin == true 
      product = Product.find(params[:id])
      product.update!(product_params)
      render json: product, status: :accepted
    else 
      render json:{error:"Unauthorized user - Not Admin"}
    end
    
  end

  def destroy

    if check_admin == true 
      product = Product.find(params[:id])
      product.destroy
      head :no_content
    else 
      render json:{error:"Unauthorized user - Not Admin"}
    end
    
  end

  private

  def product_params
    params.permit(:name, :category_id, :price, :description, :image_url, :gender)
  end

  def product_record_missing 
    render json: { "error": "Product not found"}, status: :not_found
  end

   def validation_error 
    render json:  {"errors": ["validation errors"]}, status: :unprocessable_entity
   end
end
