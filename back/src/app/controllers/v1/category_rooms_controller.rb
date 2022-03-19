class V1::CategoryRoomsController < ApplicationController
  before_action :set_category_rooms_json, only: :index

  def index
    render_json
  end

  private

  def set_category_rooms_json
    category = Category.find_by(id: params[:category_id])
    raise NotFound if category.nil?

    @json = RoomSerializer.new(category.rooms, is_collection: true)
  end
end
