'use client';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { GiClick } from "react-icons/gi";

const FlippableCard = ({ frontImage, backImage, frontText, backText, frontTitle, backTitle }) => {
    const [isFlipped, setIsFlipped] = useState(true);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="relative w-full h-96 cursor-pointer" onClick={handleFlip}>
            <AnimatePresence initial={false} mode="wait">
                {!isFlipped ? (
                    <motion.div
                        key="back"
                        className="absolute inset-0 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-1/2 h-full bg-white p-6 flex flex-col overflow-scroll">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/2880px-Flag_of_Azerbaijan.svg.png"
                                alt="Azerbaijan Flag"
                                className="w-12 h-8 mb-4 self-start"
                            />
                            <h2 className="text-2xl font-bold mb-4 text-green-600">{backTitle}</h2>
                            <p className="text-gray-700">
                                {backText}
                            </p>
                        </div>
                        <div className="w-1/2 h-full relative">
                            <Image
                                src={backImage}
                                alt="Prodigy"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <GiClick className="text-2xl text-gray-600" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="front"
                        className="absolute inset-0 flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-1/2 h-full relative overflow-hidden">
                            <Image
                                src={frontImage}
                                alt="Prodigy"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>
                        <div className="w-1/2 h-full bg-white p-6 flex flex-col overflow-scroll">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/2880px-Flag_of_Azerbaijan.svg.png"
                                alt="Azerbaijan Flag"
                                className="w-12 h-8 mb-4 self-start"
                            />
                            <h2 className="text-2xl font-bold mb-4 text-green-600">{frontTitle}</h2>
                            <p className="text-gray-700">
                                {frontText}
                            </p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <GiClick className="text-2xl text-gray-600" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlippableCard;