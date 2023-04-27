class ZipcodeSerializer < ActiveModel::Serializer
  attributes :id, :zip, :primarycity, :state, :country, :latitude, :longitude
end
