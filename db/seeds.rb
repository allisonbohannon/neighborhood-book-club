# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times do 
   User.create(
        username: Faker::Superhero.unique.name,
        password_digest: BCrypt::Password.create('password'),
        first_name: Faker::Name.unique.first_name, 
        last_name: Faker::Name.unique.last_name,
        bio: Faker::Quote.jack_handey,
        zipcode: Faker::Address.zip,
    )
end

puts "done seeding!"