import React from 'react';
import { Carousel, Typography } from "@material-tailwind/react";
import Image from 'next/image';

import img1 from '@/assets/images/about/me.jpg';
import img2 from '@/assets/images/about/me2.jpg';
import img3 from '@/assets/images/about/me_group.jpg';

const images = [
    { src: img1, alt: "Instructor 1" },
    { src: img2, alt: "Instructor 2" },
    { src: img3, alt: "Group of instructors" },
];

const HeroCarousel = () => {
    return (
        <div id="together" className="scroll-mt-[450px] sm:scroll-mt-32 mb-16 mt-8">
            <Typography
                variant="h1"
                className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white text-center"
            >
                Let's Get <span className="text-lwr-orange-color-100">Together</span>
            </Typography>

            <Carousel
                className="rounded-xl w-full max-w-6xl mx-auto mt-9 overflow-hidden"
                autoplay
                loop
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative h-[350pt]">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            priority={true}
                            style={{ objectFit: 'cover', layout: 'fill' }}
                            className="rounded-xl"
                        />
                        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                            <div className="w-3/4 text-center md:w-2/4">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    Backstage Photos
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default HeroCarousel;