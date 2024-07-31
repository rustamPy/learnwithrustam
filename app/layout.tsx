import React, { ReactNode } from 'react'
import '@/assets/styles/globals.css'

import { Typography } from "@material-tailwind/react";
export const metadata = {
  title: 'Home',
  keywords: 'LWR'
}



const HomeLayout: React.FC<({ children: ReactNode })> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Typography>
          Material Tailwind is an easy to use components library for Tailwind CSS
          and Material Design. It provides a simple way to customize your
          components, you can change the colors, fonts, breakpoints and everything
          you need.
        </Typography>
      </body>
    </html>
  )
}

export default HomeLayout