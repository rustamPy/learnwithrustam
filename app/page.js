import React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import IndexHero from '@/components/Hero/IndexHero';

const Index = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? 'Logged in' : 'Not logged in'}
      <IndexHero />
    </>
  )
}

export default Index