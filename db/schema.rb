# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_04_20_234936) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "book_club_members", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_club_id", null: false
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_book_club_members_on_book_club_id"
    t.index ["user_id"], name: "index_book_club_members_on_user_id"
  end

  create_table "book_clubs", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "zip_three"
    t.string "admin"
    t.string "status"
    t.integer "total_members"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "index_book_clubs_on_book_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "published_date"
    t.string "subject"
    t.integer "pages"
    t.string "cover_url"
    t.string "isbn"
    t.integer "average_rating"
    t.integer "total_ratings"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "book_club_member_id", null: false
    t.string "message"
    t.integer "posted_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_member_id"], name: "index_messages_on_book_club_member_id"
  end

  create_table "reading_lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_id", null: false
    t.integer "rating"
    t.string "read_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "index_reading_lists_on_book_id"
    t.index ["user_id"], name: "index_reading_lists_on_user_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "following_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["follower_id", "following_id"], name: "index_relationships_on_follower_id_and_following_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
    t.index ["following_id"], name: "index_relationships_on_following_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "bio"
    t.string "zipcode"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "follower_count"
    t.integer "following_count"
  end

  add_foreign_key "book_club_members", "book_clubs"
  add_foreign_key "book_club_members", "users"
  add_foreign_key "book_clubs", "books"
  add_foreign_key "messages", "book_club_members"
  add_foreign_key "reading_lists", "books"
  add_foreign_key "reading_lists", "users"
end
