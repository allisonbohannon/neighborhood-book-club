class ChangeUserZipToString < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :zipcode, :string
  end
end
