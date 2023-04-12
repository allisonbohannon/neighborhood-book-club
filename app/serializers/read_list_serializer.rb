class ReadListSerializer < ActiveModel::Serializer
  attributes :id, :rating, :read_status
  has_one :user_id
  has_one :book_id
end
