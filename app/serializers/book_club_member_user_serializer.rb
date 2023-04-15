class BookClubMemberUserSerializer < ActiveModel::Serializer
  attributes :id, :status

  belongs_to :user
end
