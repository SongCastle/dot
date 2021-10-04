class V1::CategoriesController < ApplicationController
  def index
    @categories = Category.order(id: :desc).limit(5)
    render json: @categories
  end
end
