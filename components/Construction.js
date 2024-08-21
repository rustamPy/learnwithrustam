import { Typography } from '@material-tailwind/react';


const Construction = () => {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-10">
            <div className="backdrop-blur-lg absolute inset-0"></div>
            <Typography
                color="red"
                className="text-6xl font-extrabold uppercase text-center z-20"
            >
                Under Construction
            </Typography>
        </div>
    )
}

export default Construction;