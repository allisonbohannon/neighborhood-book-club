class User < ApplicationRecord
    has_secure_password

    has_many :reading_lists
    has_many :books, through: :reading_lists

    has_many :book_club_members
    has_many :book_clubs, through: :book_club_members
    has_many :messages, through: :book_club_members

    validates :username, :email, :zipcode, presence: true
    validates :username, uniqueness: { message: "%{value} is already taken"}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
    validates :password, length: { minimum: 8 }
    validates :zipcode, length: { is: 5 }
    validates :bio, length: { maximum: 500, 
         too_long: "%{count} characters is the maximum allowed"}
end
