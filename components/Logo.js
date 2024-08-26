import { Typography } from "@material-tailwind/react";
const Logo = ({ variant, customClass = '' }) => {
    const SIZE_MAP = {
        'lg': 'text-2xl',
        'sm': 'text-base'
    }
    return (

        <>
            <Typography
                as="a"
                href="/"
                className={`cursor-pointer py-1.5 ${SIZE_MAP[variant]} font-extrabold text-lwr-logo-light-theme-color dark:text-lwr-logo-dark-theme-color ${customClass}`}>
                LEARN {<span className="text-lwr-orange-color-100">{'{W}'}</span>} RUSTAM
            </Typography>
        </>
    )
}

export default Logo;