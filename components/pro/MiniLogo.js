import { Typography } from "@material-tailwind/react";
const MiniLogo = () => {

    return (

        <>
            <Typography
                as="a"
                href="/"
                className={`cursor-pointer font-extrabold text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color`}>
                L {<span className="text-lwr-orange-color-100">{'{W}'}</span>} R
            </Typography>
        </>
    )
}

export default MiniLogo;