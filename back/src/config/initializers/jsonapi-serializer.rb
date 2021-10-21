module ModifyIDHash
  def id_hash(id, record_type, default_return = false)
    if id.present?
      # id を数値にする
      { id: id, type: record_type }
    else
      default_return ? { id: nil, type: record_type } : nil
    end
  end
end

# https://github.com/jsonapi-serializer/jsonapi-serializer/blob/v2.2.0/lib/fast_jsonapi/relationship.rb#L130-L136
FastJsonapi::Relationship.prepend(ModifyIDHash)

# https://github.com/jsonapi-serializer/jsonapi-serializer/blob/v2.2.0/lib/fast_jsonapi/serialization_core.rb#L29-L35
FastJsonapi::SerializationCore.module_eval do
  class_methods do
    def self.extended(mod)
      mod.extend(ModifyIDHash)
    end
  end
end
