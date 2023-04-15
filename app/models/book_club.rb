class BookClub < ApplicationRecord
  belongs_to :book

  has_many :book_club_members
  has_many :users, through: :book_club_members
end
