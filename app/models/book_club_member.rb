class BookClubMember < ApplicationRecord
  belongs_to :user
  belongs_to :book_club

  has_many :messages
end
