import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'

const HomeLayout: React.FC = () => {
  return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
  )
}

export default HomeLayout
