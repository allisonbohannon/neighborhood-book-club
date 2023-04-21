class FollowingRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :follower_id

  belongs_to :follower
end
