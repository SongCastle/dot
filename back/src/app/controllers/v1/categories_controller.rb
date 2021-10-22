class V1::CategoriesController < ApplicationController
  before_action :set_categories, only: :index
  before_action :set_category, only: :show

  def index
    render json: @categories&.map(&:to_response)
  end

  def show
    render json: @category
  end

  private

  def set_categories
    @categories =
      case params[:type]
      when 'main'
        Category.only_main
      when 'sub'
        Category.only_sub
      else
        Category
      end.order(id: :desc).limit(5)
  end

  def set_category
    @category = Category.find_by(id: params[:id])
    raise NotFound if @category.nil?
  end
end
