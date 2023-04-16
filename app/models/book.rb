class Book < ApplicationRecord

    has_many :reading_lists
    has_many :users, through: :reading_lists

    has_many :book_clubs
    has_many :book_club_members, through: :book_clubs

    def total_ratings 
        self.reading_lists.count(:rating)
    end

    def average_rating 
        self.reading_lists.average(:rating)
    end

   
end
