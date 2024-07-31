import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Header/Navbar';
import Banner from '@/components/Header/Banner';
import { Typography } from "@material-tailwind/react";
export const metadata = {
  title: 'Home',
  keywords: 'LWR'
}

import LWRFooter from '@/components/Footer/LWRFooter'
import SearchWindow from '@/components/Hero/SearchWindow';


const HomeLayout: React.FC<({ children: ReactNode })> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Typography variant="h5" className="mb-6">
          Material Tailwind
        </Typography>
      </body>
    </html>
  )
}

export default HomeLayout