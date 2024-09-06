// RootLayout.js
import React from 'react';
import '@/assets/styles/globals.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/(pro)/api/auth/[...nextauth]/options';
import ClientSessionProvider from './SessionProvider';
import NavBar from '@/components/pro/Header/Navbar';
import LWRFooter from '@/components/pro/Footer/LWRFooter';
import { ThemeProvider } from 'next-themes';
import { NavbarVisibilityProvider } from '@/components/pro/Header/NavbarVisibilityContext'; // Import the context provider

export const metadata = {
  title: 'LWR',
  description: 'Learn with Rustam'
};

const Theme = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
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
      <body>
        <Theme>
          <NavbarVisibilityProvider>
            <ClientSessionProvider session={session}>
              <NavBar />
              {children}
              <LWRFooter />
            </ClientSessionProvider>
          </NavbarVisibilityProvider>
        </Theme>
      </body>
    </html>
  );
}
