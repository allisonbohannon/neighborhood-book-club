class FollowerRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :following_id

  belongs_to :following
end
