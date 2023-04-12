class UserReadingListSerializer < ActiveModel::Serializer
  attributes :id, :rating, :read_status

  belongs_to :book
end
