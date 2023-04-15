class UserReadingListSerializer < ActiveModel::Serializer
  attributes :id, :rating, :read_status, :book_id 

  belongs_to :book
end
