class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :password_digest, :bio, :zipcode

  has_many :reading_lists, serializer: UserReadingListSerializer
  has_many :follower_relationships, serializer: FollowerRelationshipSerializer
  has_many :following_relationships, serializer: FollowingRelationshipSerializer
end
