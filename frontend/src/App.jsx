import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddProduct } from './components'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import AddProductPage from './pages/AddProductPage'
import Home from './pages/Home'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
