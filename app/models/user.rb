class User < ApplicationRecord
    has_secure_password

    has_many :reading_lists
    has_many :books, through: :reading_lists

    has_many :book_club_members
    has_many :book_clubs, through: :book_club_members
    has_many :messages, through: :book_club_members

    has_many :follower_relationships, foreign_key: :follower_id, class_name:  "Relationship",
            dependent:   :destroy
    has_many :followers, through: :follower_relationships, source: :follower

    has_many :following_relationships, foreign_key: :following_id, class_name:  "Relationship",
            dependent:   :destroy
    has_many :followings,  through: :following_relationships, source: :following

    def valid_zipcodes
        Zipcode.map {|z| z.zip}
    end

    validates :username, :email, :zipcode, presence: true
    validates :username, uniqueness: { message: "%{value} is already taken"}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false, message: "There is already an account associated with this email"}
    validates :password, length: { minimum: 8 }, if: :password_digest_changed?
    validates :zipcode,  inclusion: { in: Zipcode.all.map {|z| z.zip} , 
        message: "%{value} is not a valid US zipcode" }
    validates :bio, length: { maximum: 500, 
         too_long: "%{count} characters is the maximum allowed"}

    def follower_count 
        self.followers.count
    end
    
    def following_count
        self.followings.count
    end

    def books_read 
        read_books = self.reading_lists.select {|item| item.read_status == 'Have read'}
        read_books.count 
    end

    
end
