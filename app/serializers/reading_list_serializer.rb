class ReadingListSerializer < ActiveModel::Serializer
  attributes :id, :rating, :read_status
  has_one :user
  has_one :book
end
