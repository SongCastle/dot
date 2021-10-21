class RoomSerializer
  include JSONAPI::Serializer

  attributes :name, :creator_id, :created_at, :creator_id
  has_many :categories
end
