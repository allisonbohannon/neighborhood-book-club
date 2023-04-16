class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :posted_date
  has_one :book_club_member
end
