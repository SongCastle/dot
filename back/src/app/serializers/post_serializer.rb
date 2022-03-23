class PostSerializer
  include JSONAPI::Serializer

  attributes :message, :user_id, :created_at

  belongs_to :room
end
