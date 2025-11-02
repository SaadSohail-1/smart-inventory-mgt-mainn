import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddProductPage from './pages/AddProductPage.jsx'
import { RouterProvider } from 'react-router-dom'
import Products from './pages/Products.jsx'
import UpdatePage from './pages/UpdatePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add-product",
        element: <AddProductPage />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/update/:id",
        element: <UpdatePage />
      }
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
