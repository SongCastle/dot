class V1::SearchRoomsController < V1::SearchController
  def index
    rooms = Room.search(keyword)
    @json = RoomSerializer.new(rooms, is_collection: true)

    return_json
  end
end
