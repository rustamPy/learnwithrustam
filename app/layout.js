'use client';
import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';
import { SessionProvider } from "next-auth/react";

import LWRFooter from '@/components/Footer/LWRFooter'


const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>

          <Banner />
          <NavBar />
          <main>
            {children}
          </main>
          <LWRFooter />
        </SessionProvider>
      </body>
    </html>
  )
}

export default HomeLayout