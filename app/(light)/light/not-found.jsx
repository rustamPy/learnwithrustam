'use client';
import '@/assets/styles/globals.css'
import { usePathname } from 'next/navigation';

const LightNotFound = () => {
    return (
        <div className="flex align-center justify-center m-auto top-0 ">
            <p>{usePathname}</p>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnNwazJ1enR0YzBoYzFyODIydmN3NGJ3bDhqbmdpdHM4cWo4cXpobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VwoJkTfZAUBSU/giphy.gif" />
        </div>
    )
}

export default LightNotFound;