# Neighborhood Book Club

<img src="./client/src/images/logo.png" alt="Neighborhood Book Club" style="height:15em; width:20em; object-fit:contain " />

## Description
Neighborhood Book Club is a social website that allows users to find other local users who want to talk about books they are reading (or have read). 

Wherein a traditional book club typically centers around a set group choosing a book to read each cycle, Neighborhood Book CLub allows users to find or create a local book club based on what they are already reading or want to read. 

Users signup with a zipcode, and zipcodes are used to drive location within the app. Users can search for books (with results from OpenLibrary API) to add to their reading list, indicating they either have read or want to read a book. If a user has read a book, they are also able to add their rating. 

From there, users can see whether a local book club exists (based on zipcode proximity), or start a local club if there is not one already. Users within a bookclub will have a message board to arrange meet ups, and users can edit or delete their own posts. Posts will be preserved, however, if a user leaves a group. Admins who started the group have the discretion to remove any post. 

Within a bookclub, users can view other members. Users can follow (and unfollow) other users, and can see each users reading lists to get ideas for their next read. 

## Technologies Used

- Ruby 2.7.4, including ActiveRecord
- NodeJS (v16), and npm
- React front-end
- Material UI
- Postgresql
- Optimized for deploying via Render
- OpenLibrary API is used to populate book search results 

## Running Locally

```sh
bundle install
rails db:create
npm install --prefix client
rails db:migrate 
rails db:seed (optional)
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)


### Deployment Link: 

https://neighborhood-book-club.onrender.com

### Video walkthru: 