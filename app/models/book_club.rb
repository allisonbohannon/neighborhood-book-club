class BookClub < ApplicationRecord
  belongs_to :book

  has_many :book_club_members
  has_many :users, through: :book_club_members

  def total_members
    self.book_club_members.count
  end

end
