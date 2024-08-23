import { Carousel, Button, Typography } from "@material-tailwind/react";
import Image from 'next/image';

import img1 from '@/assets/images/about/me.jpg'
import img2 from '@/assets/images/about/me2.jpg'
import img3 from '@/assets/images/about/me_group.jpg'


const HeroCarousel = () => {
    return (
        <div id="together" className="py-24">
            <Typography
                variant="h1"
                className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white"
            >
                Let's Get <span className="text-lwr-orange-color-100">Together</span>
            </Typography>

            <Carousel loop autoplay className="rounded-xl w-full max-w-6xl mx-auto mt-9 h-[350pt]">

                <Image
                    src={img1}
                    alt="image 1"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                />
                <Image
                    src={img2}
                    alt="image 2"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                />
                <Image
                    src={img3}
                    alt="image 3"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>

    );
}

export default HeroCarousel;