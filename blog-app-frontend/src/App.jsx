//rafce

import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import DashBoard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comment'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css' 
import {Toaster} from 'react-hot-toast' // error notification ke liye use hota hai backend ko frontend main jodhte time
import { useAppContext } from './context/AppContext'

// App component that defines the routes for the application
// It uses React Router to handle navigation between the Home and Blog pages.
// The Home component is displayed at the root path ("/") and the Blog component at the "/blog" path.

const App = () => {
  const {token} = useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<DashBoard />}/>
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
