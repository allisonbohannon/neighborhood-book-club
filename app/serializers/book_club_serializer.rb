class BookClubSerializer < ActiveModel::Serializer
  attributes :id, :zip_three, :admin, :status, :total_members
  has_one :book
end
