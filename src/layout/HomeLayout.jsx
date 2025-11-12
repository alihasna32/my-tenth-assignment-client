import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
     <title>HOME</title>
      <header>
        <Navbar />
      </header>

      <main className="grow">
        <div>
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default HomeLayout