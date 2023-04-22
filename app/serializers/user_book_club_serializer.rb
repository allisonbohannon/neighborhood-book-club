class UserBookClubSerializer < ActiveModel::Serializer
  attributes :id, :book_club_id, :status
  belongs_to :book_club 
end
