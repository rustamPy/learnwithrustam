
import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Home',
  keywords: 'LWR'
}


const HomeLayout: React.FC<({ children: ReactNode, title: string })> = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NavBar />
        <main>

          {children}

        </main>
        <Footer />

      </body>
    </html>
  )
}

export default HomeLayout