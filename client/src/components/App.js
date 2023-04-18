import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Users from "../pages/Users";
import BookPage from "../pages/BookPage";
import BookClubPage from "../pages/BookClubPage";
import BookClubMembersPage from "../pages/BookClubMembersPage";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { UserContext } from "../context/User";


function App() {

  const { currentUser, setCurrentUser} = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [bookClubs, setBookClubs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchActive, setSearchActive ] = useState(false)

// Check sessions to see whether a user is logged in
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } 
    });
  }, []);


  //Set initial states

  useEffect(() => {
    fetch(`/books`)
    .then(r => r.json())
    .then(data => setBooks(data))

    fetch(`/users`)
    .then(r => r.json())
    .then(data => setUsers(data))

    fetch(`/book_clubs`)
    .then(r => r.json())
    .then(data => setBookClubs(data))

  }, []);

  const onAddBook = (newBook) => {
      setBooks([...books, newBook])
  };

  const onUpdateBook = (bookId) => {
      fetch(`/books/${bookId}`)
      .then(r => r.json())
      .then(data => {
        setBooks((books)=> 
          books.map((book)=> {
            return book.id === bookId ? data : book
        })
      )}
  )};

  const onAddUser = (newUser) => {
    setUsers([...users, newUser])
};

  const onUpdateUser = (userId) => {
    fetch(`/users/${userId}`)
    .then(r => r.json())
    .then(data => {
      setUsers((users)=> 
        users.map((user)=> {
          return user.id === userId ? data : user
      }));
      if (currentUser.id === userId) {
        setCurrentUser(data)
      };
    })
  };

  const onAddBookClub = (newBookClub) => {
    setBookClubs([...bookClubs, newBookClub])
    onUpdateBook(newBookClub.book_id)
  };

  const onUpdateBookClub = (bookClubId) => {
    fetch(`/book_clubs/${bookClubId}`)
    .then(r => r.json())
    .then(data => {
      setBookClubs((bookClubs)=> 
        bookClubs.map((club)=> {
          return club.id === bookClubId ? data : club
      }))
    })
  };

  if (!currentUser) return (
    <div>
      <Routes>
        <Route path="/" element={<Login
                />} />
        <Route path="/signup" element={<SignUp
                  onAddUser={onAddUser}
                />} />
      </Routes>
    </div>
    ); 

  return (
    <div>
            <NavigationBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSearchActive={setSearchActive}
              setSearchResults={setSearchResults}
            />
            <Routes>
                <Route path="/books" element={<Books
                  searchTerm={searchTerm}
                  searchActive={searchActive}
                  searchResults={searchResults}
                  onAddBook={onAddBook}
                />}/> 
                <Route path="/books/:bookId" element={<BookPage
                  books={books}
                  users={users}
                  onUpdateUser={onUpdateUser}
                  onUpdateBook={onUpdateBook}
                  onAddBookClub={onAddBookClub}
                />}/>
                 <Route path="/books/:bookId/bookclubs/:bookClubId" element={<BookClubPage
                  bookClubs={bookClubs}
                  onUpdateBookClub={onUpdateBookClub}
                  onUpdateUser={onUpdateUser}
                />}/>
                  <Route path="/bookclubs/:bookClubId" element={<BookClubPage
                  bookClubs={bookClubs}
                  onUpdateBookClub={onUpdateBookClub}
                  onUpdateUser={onUpdateUser}
                />}/>
                <Route path="/bookclubs/:bookClubId/members" element={<BookClubMembersPage
                  bookClubs={bookClubs}
                />}/>
                <Route path="/mybooks" element={<MyBooks
                    books={books}
                    users={users}
                    onUpdateUser={onUpdateUser}
                    onUpdateBook={onUpdateBook}
                />}/>
                <Route path="/users/:id" element={<Users
                   users={users}
                />} />
                <Route path="/login" element={<Login
                />} />
                <Route path="/signup" element={<SignUp 
                    onAddUser={onAddUser}
                />} />
                <Route path="/" element={<Home
                />} />
               
            </Routes>
        </div>
  );
}

export default App;
