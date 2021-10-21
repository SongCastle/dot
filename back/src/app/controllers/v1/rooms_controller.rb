class V1::RoomsController < ApplicationController
  before_action :set_rooms_json, only: :index
  before_action :set_room_json, only: :show

  def index
    return_json
  end

  def show
    return_json
  end

  private

  def set_rooms_json
    rooms = Room.order(id: :desc).limit(5)
    @json = RoomSerializer.new(rooms, is_collection: true)
  end

  def set_room_json
    room = Room.find_by(id: params[:id])
    raise NotFound if room.nil?

    @json = RoomSerializer.new(room)
  end
end
