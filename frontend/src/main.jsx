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
import Orders from './pages/Orders.jsx'
import OrderHistoryPage from './pages/OrderHistoryPage.jsx'
import NewOrderForm from './components/NewOrderForm.jsx'

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
      },
      {
        path: "/orders",
        element:<Orders />
      },
      {
        path: "/order-history",
        element: <OrderHistoryPage />
      },
      {
        path: "/new-order",
        element: <NewOrderForm />
      }
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
