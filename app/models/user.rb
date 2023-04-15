class User < ApplicationRecord
    has_secure_password

    has_many :reading_lists
    has_many :books, through: :reading_lists

    has_many :book_clubs_members
    has_many :book_clubs, through: :book_club_members
end
