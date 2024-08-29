import React from 'react';
import '@/assets/styles/globals.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ClientSessionProvider from './SessionProvider';
import NavBar from '@/components/Header/Navbar';
import LWRFooter from '@/components/Footer/LWRFooter';
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: 'LWR',
  description: 'Learn with Rustam'
};


const Theme = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Theme>
        <ClientSessionProvider session={session}>
          <NavBar />
          <main>{children}</main>
          <LWRFooter />
        </ClientSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
