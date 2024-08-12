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
                Let's Bring <span className="text-lwr-orange-color-100">Together</span>
            </Typography>

            <Carousel loop autoplay className="rounded-xl w-full max-w-6xl mx-auto mt-9 h-[350pt]">
                <div className="relative h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                Leetcode
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                It is not so much for its beauty that the forest makes a claim
                                upon men&apos;s hearts, as for that subtle something, that quality
                                of air that emanation from old trees, that so wonderfully changes
                                and renews a weary spirit.
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white">
                                    Explore
                                </Button>
                                <Button size="lg" color="white" variant="text">
                                    Gallery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
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