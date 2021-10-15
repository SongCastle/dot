class V1::CategoryRoomsController < ApplicationController
  before_action :set_category, only: :index

  def index
    render json: @category.rooms
  end

  private

  def set_category
    @category = Category.find_by(id: params[:category_id])
    raise NotFound if @category.nil?
  end
end
