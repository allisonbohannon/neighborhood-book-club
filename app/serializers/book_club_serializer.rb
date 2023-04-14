class BookClubSerializer < ActiveModel::Serializer
  attributes :id, :zip_three, :admin, :status, :total_members
  belongs_to :book
end
