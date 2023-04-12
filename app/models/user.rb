class User < ApplicationRecord
    has_secure_password

    has_many :reading_lists
    has_many :books, through: :reading_lists
end
