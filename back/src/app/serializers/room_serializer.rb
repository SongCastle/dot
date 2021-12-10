class RoomSerializer
  include JSONAPI::Serializer

  attributes :name, :description, :creator_id, :created_at

  has_one :main_category
  has_many :sub_categories
end
