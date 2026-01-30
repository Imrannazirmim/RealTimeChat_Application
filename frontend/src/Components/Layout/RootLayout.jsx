import React from 'react'
import Navbar from '../Common/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Common/Footer'

const RootLayout = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default RootLayout