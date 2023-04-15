class CreateBookClubMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :book_club_members do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :book_club, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
