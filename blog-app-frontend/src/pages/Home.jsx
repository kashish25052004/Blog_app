import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Footer from '../components/Footer'

// Home component that renders the Navbar and Header components
// It serves as the main page of the blog application, displaying the navigation bar and header section.

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Footer />
    </>
  )
}

export default Home
