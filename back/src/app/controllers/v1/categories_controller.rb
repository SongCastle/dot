class V1::CategoriesController < ApplicationController
  def index
    categories =
      case params[:type]
      when 'main'
        Category.only_main
      when 'sub'
        Category.only_sub
      else
        Category
      end.order(id: :desc).limit(5)

    render json: categories
  end

  def show
    category = Category.find_by(id: params[:id])
    raise NotFound if category.nil?
    render json: category
  end
end
