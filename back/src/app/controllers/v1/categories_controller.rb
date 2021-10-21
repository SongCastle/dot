class V1::CategoriesController < ApplicationController
  before_action :set_categories_json, only: :index
  before_action :set_category_json, only: :show

  def index
    return_json
  end

  def show
    return_json
  end

  private

  def set_categories_json
    categories =
      case params[:type]
      when 'main'
        Category.only_main
      when 'sub'
        Category.only_sub
      else
        Category
      end.order(id: :desc).limit(5)

    @json = CategorySerializer.new(categories, is_collection: true)
  end

  def set_category_json
    category = Category.find_by(id: params[:id])
    raise NotFound if category.nil?

    @json = CategorySerializer.new(category)
  end
end
