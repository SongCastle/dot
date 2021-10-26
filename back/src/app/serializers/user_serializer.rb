class UserSerializer
  include JSONAPI::Serializer

  attributes :login, :name, :email, :created_at
end
