class CreateReadLists < ActiveRecord::Migration[6.1]
  def change
    create_table :read_lists do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :book, null: false, foreign_key: true
      t.integer :rating
      t.string :read_status

      t.timestamps
    end
  end
end
