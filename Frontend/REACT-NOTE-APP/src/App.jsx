import React from "react";
import {useState, useEffect} from "react"; // Importing useState from React for state management`
import MainLayout from './layouts/MainLayout'; // Importing the MainLayout component
import HomePage from './pages/HomePage'; // Importing the HomePage component
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Importing necessary functions from react-router-dom
import AddNotePage from './pages/AddNotePage'; // Importing the AddNotePage component
import NoteDetailPage from './pages/NoteDetailPage'; // Importing the NoteDetailPage component
import EditNotePage from './pages/EditNotePage'; // Importing the EditNotePage component
import axios from 'axios'; // Importing axios for making HTTP requests
import {toast} from 'react-toastify'
const App = () => {

  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get("http://127.0.0.1:8008/notes/")      .then(res => {
        console.log(res.data);
        setNotes(res.data);
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])

  const addNote = (data) => {
      axios.post("http://127.0.0.1:8008/notes/", data)    .then(res => {
      toast("A new note has been added");
      console.log(res.data)
    })

    .catch(err =>{
console.log(console.log(err.message))
    })
  }

  // Creating a router with routes defined using createRoutesFromElements
  const router = createBrowserRouter(
    // Defining the routes for the application
    createRoutesFromElements(
      // Defining a route for the root path ("/") that uses MainLayout
<Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage notes={notes} loading = {isLoading} />} />
  <Route path="add-note" element={<AddNotePage addNote={addNote} />} />
  <Route path="edit-note/:slug" element={<EditNotePage />} />
  <Route path="notes/:slug" element={<NoteDetailPage />} /> 
</Route>
    )
  );
  // Returning the RouterProvider component with the created router
  return <RouterProvider router={router} />;
};

export default App;