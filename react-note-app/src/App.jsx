import {useState, useEffect} from "react"; // Importing useState from React for state management`
import MainLayout from './layouts/MainLayout'; // Importing the MainLayout component
import HomePage from './pages/HomePage'; // Importing the HomePage component
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Importing necessary functions from react-router-dom
import AddNotePage from './pages/AddNotePage'; // Importing the AddNotePage component
import NoteDetailPage from './pages/NoteDetailPage'; // Importing the NoteDetailPage component
import EditNotePage from './pages/EditNotePage'; // Importing the EditNotePage component
import axios from 'axios'; // Importing axios for making HTTP requests
const App = () => {

  const [notes, setNotes] = useState([])

    useEffect(() => {
      axios.get("http://127.0.0.1:8004/notes/")      
      .then(res => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])
  // Creating a router with routes defined using createRoutesFromElements
  const router = createBrowserRouter(
    // Defining the routes for the application
    createRoutesFromElements(
      // Defining a route for the root path ("/") that uses MainLayout
<Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage notes={notes} />} />
  <Route path="add-note" element={<AddNotePage />} />
  <Route path="edit-note" element={<EditNotePage />} />
  <Route path="note-detail" element={<NoteDetailPage />} />
</Route>
    )
  );
  // Returning the RouterProvider component with the created router
  return <RouterProvider router={router} />;
};

export default App;