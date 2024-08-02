import React from 'react'
import '@/assets/styles/globals.css'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import ClientSessionProvider from './SessionProvider'
import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';
import LWRFooter from '@/components/Footer/LWRFooter'


export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
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