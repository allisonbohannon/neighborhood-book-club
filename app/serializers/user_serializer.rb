class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :password_digest, :bio, :zipcode

  has_many :reading_lists, serializer: UserReadingListSerializer
end
