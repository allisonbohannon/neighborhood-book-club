class BookClubMemberSerializer < ActiveModel::Serializer
  attributes :id, :status
  has_one :user
  has_one :book_club
end
