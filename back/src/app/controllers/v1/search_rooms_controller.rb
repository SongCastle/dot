class V1::SearchRoomsController < V1::SearchController
  def index
    rooms = Room.search(query)
    @json = RoomSerializer.new(rooms, is_collection: true)

    render_json
  end
end
