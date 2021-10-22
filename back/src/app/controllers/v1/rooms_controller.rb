class V1::RoomsController < ApplicationController
  before_action :set_rooms, only: :index
  before_action :set_room, only: :show

  def index
    render json: @rooms&.map(&:to_response)
  end

  def show
    render json: @room
  end

  private

  def set_rooms
    @rooms = Room.order(id: :desc).limit(5)
  end

  def set_room
    @room = Room.find_by(id: params[:id])
    raise NotFound if @room.nil?
  end
end
