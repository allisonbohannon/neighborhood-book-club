import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Users from "../pages/Users";
import BookPage from "../pages/BookPage";
import BookClubPage from "../pages/BookClubPage";
import EditCommentForm from "../pages/EditCommentForm";
import ShowCommentForm from "../pages/ShowCommentForm";
import AddCommentForm from "../pages/AddCommentForm";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { UserContext } from "../context/User";


function App() {

  const { currentUser, setCurrentUser} = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [bookClubs, setBookClubs] = useState([])

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

  const onAddBookClub = (newBookClub) => {
    setBookClubs([...bookClubs, newBookClub])
    onUpdateBook(newBookClub.book_id)
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

  const onEditComment = (updatedComment) => {
    // setComments((comments)=> 
    //   comments.map((comment)=> {
    //     return comment.id === updatedComment.id ? updatedComment : comment
    // })
  // )
}

  const onDeleteComment = (deletedComment) => {
    // setComments((comments) => 
    //   comments.filter((comment) => comment.id !== deletedComment.id)
  // )
}

  const onAddUser = (userObject) => {
    setUsers([...users, userObject])
  }
  //ensure user login prior to showing page

  // if (!currentUser) return (
  //   <div>
  //     <Routes>
  //       <Route path="/" element={<Login
  //               />} />
  //       <Route path="/signup" element={<SignUp
  //                 onAddUser={onAddUser}
  //               />} />
  //     </Routes>
  //   </div>
  //   ); 

  return (
    <div>
            <NavigationBar />
            <Routes>
                <Route path="/books" element={<Books
                  books={books}
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
                  books={books}
                  users={users}
                  bookClubs={bookClubs}
                />}/>
                  <Route path="/bookclubs/:bookClubId" element={<BookClubPage
                  books={books}
                  users={users}
                  bookClubs={bookClubs}
                />}/>
                 <Route path="/bookclub/:bookclubId/messages/new" element={<AddCommentForm
                   books={books}
                   users={users}
                   bookClubs={bookClubs}
                />}/>
                   <Route path="/bookclub/:bookclubId/messages/:messageId/edit" element={<AddCommentForm
                   books={books}
                   users={users}
                   onEditComment={onEditComment}
                   onDeleteComment={onDeleteComment}
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
                   users={users}
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
