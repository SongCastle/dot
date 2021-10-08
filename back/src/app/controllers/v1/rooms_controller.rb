class V1::RoomsController < ApplicationController
  def index
    rooms = Room.order(id: :desc).limit(5)
    render json: rooms
  end

  def show
    room = Room.find_by(id: params[:id])
    raise NotFound if room.nil?
    render json: room
  end
end
