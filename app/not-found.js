import React from 'react'
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <section className="min-h-screen flex-grow">
    <div className="container m-auto max-w-2xl py-24">
      <div
          className="bg-lwr-orange-100 px-6 py-24 mb-4 shadow-md rounded-md m-4 md:m-0"
      >
        <div className="flex justify-center">
            <FaExclamationTriangle className='text-8xl text-white' />
        </div>
        <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">404</h1>
            <p className="text-xl mb-10">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
              className="bg-lwr-blue-500 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >Go Home</Link>
        </div>
      </div>
    </div>
    <div className="flex-grow"></div>
  </section>
  )
}

export default NotFound