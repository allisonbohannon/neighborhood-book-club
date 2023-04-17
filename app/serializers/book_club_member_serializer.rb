class BookClubMemberSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id
  belongs_to :user
  belongs_to :book_club
end
