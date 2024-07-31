import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';

export const metadata = {
  title: 'Home',
  keywords: 'LWR'
}

import LWRFooter from '@/components/Footer/LWRFooter'


const HomeLayout: React.FC<({ children: ReactNode })> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Banner />
        <NavBar />
        <main>
          {children}
        </main>
        <LWRFooter />
      </body>
    </html>
  )
}

export default HomeLayout