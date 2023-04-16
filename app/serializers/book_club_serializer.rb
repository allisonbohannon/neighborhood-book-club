class BookClubSerializer < ActiveModel::Serializer
  attributes :id, :zip_three, :admin, :status, :total_members, :created_at
  belongs_to :book

  has_many :book_club_members, serializer: BookClubMemberMessageSerializer
end
