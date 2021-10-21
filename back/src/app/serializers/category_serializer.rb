class CategorySerializer
  include JSONAPI::Serializer

  attributes :name, :creator_id, :created_at
  has_many :rooms
end
