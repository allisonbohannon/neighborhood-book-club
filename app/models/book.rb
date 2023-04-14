class Book < ApplicationRecord

    has_many :reading_lists
    has_many :users, through: :reading_lists

    has_many :book_clubs

    def total_ratings 
        self.reading_lists.count {|item| !item.rating.nil? }
    end

    def average_rating 
        holder_arr = []
       if self.reading_lists.count != 0 
            self.reading_lists.each do |item|
                    holder_arr << item.rating 
             end
            holder_arr.sum/total_ratings
        else
            0
        end
    end

   
end
