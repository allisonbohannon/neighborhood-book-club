class ChangeClubZipToString < ActiveRecord::Migration[6.1]
  def change
    change_column :book_clubs, :zip_three, :string
  end
end
