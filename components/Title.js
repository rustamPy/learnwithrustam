'use client';
import { Typography } from "@material-tailwind/react"

const Title = ({ value, children }) => {
    return (
        <div className="p-2 mb-10 flex flex-col items-center">
            <Typography className="text-5xl font-extrabold mb-6 uppercase rainbow-text">{value}</Typography>
            {children}
        </div>
    )
}

export default Title;