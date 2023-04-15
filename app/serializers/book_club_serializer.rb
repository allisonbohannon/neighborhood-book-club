class BookClubSerializer < ActiveModel::Serializer
  attributes :id, :zip_three, :admin, :status, :total_members
  belongs_to :book

  has_many :book_club_members, serializer: BookClubMemberSerializer
end
