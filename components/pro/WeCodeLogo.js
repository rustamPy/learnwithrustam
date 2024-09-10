import { Typography } from "@material-tailwind/react";

const WeCodeLogo = ({ linked = true, size = 16 }) => {

    return (
        <>
            {linked ? <Typography
                as="a"
                href="/"
                className={`cursor-pointer font-extrabold text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color text-[${size}px]`}>
                {<span className="text-lwr-orange-color-100 ml-1 -mr-1">{'W'}</span>} {'/Code'}
            </Typography> :
                <Typography
                    className={`cursor-pointer font-extrabold text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color text-[${size}px]`}>
                    {<span className="text-lwr-orange-color-100 ml-1 -mr-1">{'W'}</span>} {'/Code'}
                </Typography>
            }

        </>
    )
}
export default WeCodeLogo;