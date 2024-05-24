import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import ThemeToggle from '@/components/ToggleTheme';

import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Home',
  keywords: 'LWR'
}

// lwr

import LWRFooter from '@/components/Footer/LWRFooter'


const HomeLayout: React.FC<({ children: ReactNode })> = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning className='dark:bg-lwr-dark-blue p-2'>
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