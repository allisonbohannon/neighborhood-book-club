class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :published_date, :subject, :pages, :cover_url, :isbn, :average_rating, :total_ratings

  has_many :book_clubs
end
