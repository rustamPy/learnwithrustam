'use client';
import '@/assets/styles/globals.css'
import { usePathname } from 'next/navigation';
const LightNotFound = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col align-center items-center m-auto mt-16">
            <p>What? "{pathname}"? Are you kidding?</p>
            <img className="w-80" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnNwazJ1enR0YzBoYzFyODIydmN3NGJ3bDhqbmdpdHM4cWo4cXpobCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VwoJkTfZAUBSU/giphy.gif" />
        </div>
    )
}

export default LightNotFound;