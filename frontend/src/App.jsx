import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from "./Layout/MainLayout"
import Home from "./pages/Home"
import ItemDetails from "./pages/ItemDetails"
import Search from "./pages/Search"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import MyItems from "./pages/MyItems"
import AddItem from "./pages/AddItem"
import UpdateItem from "./pages/UpdateItem"
import DeleteItem from "./pages/DeleteItem"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home />},
        { path: "/search", element: <Search />},
        { path: "/signup", element: <SignUp />},
        { path: "/signin", element: <SignIn />},
        { path: "/myitems", element: <MyItems />},
        { path: "/additem", element: <AddItem />},
        { path: "/update/:id", element: <UpdateItem />},
        { path: "/delete/:id", element: <DeleteItem />},
        { path: "/:id", element: <ItemDetails />}, //always --->  keep this at the end
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App