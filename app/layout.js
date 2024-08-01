import React from 'react'
import '@/assets/styles/globals.css'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import ClientSessionProvider from './SessionProvider'
import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';
import LWRFooter from '@/components/Footer/LWRFooter'

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <ClientSessionProvider session={session}>
          <Banner />
          <NavBar />
          <main>
            {children}
          </main>
          <LWRFooter />
        </ClientSessionProvider>
      </body>
    </html>
  )
}