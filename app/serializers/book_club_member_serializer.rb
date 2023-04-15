class BookClubMemberSerializer < ActiveModel::Serializer
  attributes :id, :status
  belongs_to :user
  belongs_to :book_club
end
