import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Users from "../pages/Users";
import BookPage from "../pages/BookPage";
import EditCommentForm from "../pages/EditCommentForm";
import ShowCommentForm from "../pages/ShowCommentForm";
import AddCommentForm from "../pages/AddCommentForm";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { UserContext } from "../context/User";


function App() {

  const { currentUser, setCurrentUser} =useContext(UserContext)
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])

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

  }, [])

  const onAddComment = (comment) => {
    // setComments([...comments, comment])
  }

  const onAddBook = (newBook) => {
      setBooks([...books, newBook])
    }

  const onUpdateBook = (bookId) => {
      fetch(`/users/${bookId}`)
      .then(r => r.json())
      .then(data => {
        setBooks((books)=> 
          books.map((book)=> {
            return book.id === bookId ? data : book
        })
      )}
    )};

  const onAddBookClub = (newBookClub) => {
    const updatedBooks = books.map(book => {
      if (book.id = newBookClub.book_id) {
        return {...book, bookclubs:{...book.bookclubs, newBookClub}}
      } else {
        return book
      }
    })

    setBooks(updatedBooks)
  }

  const onUpdateUser = (userId) => {
    fetch(`/users/${userId}`)
    .then(r => r.json())
    .then(data => {
      setUsers((users)=> 
        users.map((user)=> {
          return user.id === userId ? data : user
      })
    )}
  )};

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
                  onAddBookClub={onAddBookClub}
                />}/>
                 <Route path="/books/:bookId/bookclubs/:book_club_id" element={<EditCommentForm
                  books={books}
                  users={users}
                />}/>
                 <Route path="/bookclub/:bookclubId/messages/new" element={<AddCommentForm
                   books={books}
                   users={users}
                   onAddComment={onAddComment}
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
