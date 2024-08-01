import React from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
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