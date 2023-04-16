class BookClubMemberMessageSerializer < ActiveModel::Serializer
  attributes :id
  
  belongs_to :user
  has_many :messages
  

end
