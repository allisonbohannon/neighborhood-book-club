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

10.times do 
    Book.create(
        author: Faker::Book.author,
        title: Faker::Book.title, 
        subject: Faker::Book.genre
    )
end

50.times do 
    ReadingList.create(
        rating: rand(1..5),
        read_status: "Want to read",
        user_id: rand(1..10),
        book_id: rand(1..10),
    )
end

50.times do 
    BookClub.create(
        book_id: rand(1..10),
        zip_three: rand(1..999),
        status: "Active"
    )
end

100.times do 
    BookClubMember.create(
        book_club_id: rand(1..50),
        user_id: rand(1..10),
        status: "Active"
    )
end

puts "done seeding!"