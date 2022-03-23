class V1::RoomCategoriesController < ApplicationController
  before_action :set_room_categories_json, only: :index

  def index
    render_json
  end

  private

  def set_room_categories_json
    room = Room.find_by(id: params[:room_id])
    raise NotFound if room.nil?

    @json = CategorySerializer.new(room.categories, is_collection: true)
  end
end
