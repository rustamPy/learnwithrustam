import { Carousel } from "@material-tailwind/react";
import Image from 'next/image';

import img1 from '@/assets/images/about/me.jpg'
import img2 from '@/assets/images/about/me2.jpg'
import img3 from '@/assets/images/about/me_group.jpg'


const HeroCarousel = () => {
    return (
        <Carousel loop autoplay className="rounded-xl w-full max-w-6xl mx-auto mt-9">
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
    );
}

export default HeroCarousel;