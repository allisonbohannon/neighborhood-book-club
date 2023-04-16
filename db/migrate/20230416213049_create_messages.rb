class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :book_club_member, null: false, foreign_key: true
      t.string :message_content
      t.integer :posted_date

      t.timestamps
    end
  end
end
