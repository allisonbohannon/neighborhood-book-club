class UserBookClubSerializer < ActiveModel::Serializer
  attributes :id, :book_club_id
  belongs_to :book_club 
end
