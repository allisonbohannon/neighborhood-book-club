class Message < ApplicationRecord
  belongs_to :book_club_member

  def posted_date 
    self.created_at.strftime("%m-%d-%Y")
  end

end
