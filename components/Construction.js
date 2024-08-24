import { Typography } from '@material-tailwind/react';
import { LuConstruction } from "react-icons/lu";


const Construction = () => {
    return (
        <div className="mb-48 mt-48 inset-0 flex justify-center items-center bg-opacity-50">
            <div className="backdrop-blur-lg absolute inset-0"></div>
            <Typography
                color="red"
                className="text-4xl font-extrabold uppercase text-center z-20 flex flex-col items-center"
            >
                Under Construction

                <LuConstruction size={60} />
            </Typography>

        </div>
    )
}

export default Construction;