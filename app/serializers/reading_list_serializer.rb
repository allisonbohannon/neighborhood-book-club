class ReadingListSerializer < ActiveModel::Serializer
  attributes :id, :rating, :read_status
  belongs_to :user
  belongs_to :book
end
