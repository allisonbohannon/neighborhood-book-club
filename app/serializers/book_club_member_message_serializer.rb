class BookClubMemberMessageSerializer < ActiveModel::Serializer
  attributes :id, :status
  
  belongs_to :user
  has_many :messages
  
end
