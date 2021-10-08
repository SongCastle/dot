class V1::CategoryRoomsController < ApplicationController
  def index
    category = Category.find_by(id: params[:category_id])
    raise NotFound if category.nil?
    render json: category.rooms
  end
end
