class OrdersController < ApplicationController
  # before_action :authorize
  def index
    orders = Order.all
    render json: orders, status: :ok
  end
  def new
    @order = Order.new
  end
  def edit
    @order = Order.find(params[:id])
  end
  def create
    @order = Order.new(order_params)
    if @order.save
      redirect_to @order, notice: "Order was successfully created."
    else
      render :new
    end
  end
  def show
    @order = Order.find(params[:id]).to_json(:include => [{ :products => { :only => :name } }, { :user => { :only => :email } }])
    render json: @order, status: :ok
  end
  def update
    @order = Order.find(params[:id])
    if @order.update(order_params)
      redirect_to @order, notice: "Order was successfully updated."
    else
      render :edit
    end
  end
  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    redirect_to orders_url, notice: "Order was successfully destroyed."
  end
  private
  def order_params
    if params[:order].present?
      params[:order].permit(:quantity, :total_amount, :status, :address)
    else
      {}
    end
  end
end