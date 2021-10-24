class RoomSerializer
  include JSONAPI::Serializer

  attributes :name, :description, :creator_id, :created_at
  has_many :categories
end
