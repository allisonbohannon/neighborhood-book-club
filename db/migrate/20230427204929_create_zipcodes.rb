class CreateZipcodes < ActiveRecord::Migration[6.1]
  def change
    create_table :zipcodes do |t|
      t.string :zip
      t.string :primarycity
      t.string :state
      t.string :country
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
