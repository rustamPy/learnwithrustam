'use client';
import Image from "next/image";
import Teymur from './teymur.jpg'
import Teymur2 from './teymur2.jpg'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import { MdVerified } from "react-icons/md";



const FlippableCard = () => {
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
                            <h2 className="text-2xl font-bold mb-4 text-green-600">Şahmat Dahisi</h2>
                            <p className="text-gray-700">
                                Teymur Abdullayev gənc yaşlarından şahmatda üstün bacarıqlarını nümayiş etdirmişdir.
                                Onun kombinasiya düşüncəsi və rəqiblərinin strategiyalarını məharətlə öncədən görməsi,
                                onu yüksək səviyyəli oyunçu kimi tanıdıb. Şahmat masasında olan təmkinli yanaşması və hər bir
                                gedişi incəliklə analiz etməsi, Teymurun zəfərlərini təmin edir. Daha çox məlumat əldə etmək üçün klikləyin!
                            </p>
                        </div>
                        <div className="w-1/2 h-full relative">
                            <Image
                                src={Teymur2}
                                alt="Teymur Abdullayev"
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
                                src={Teymur}
                                alt="Teymur Abdullayev"
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
                            <h2 className="text-2xl font-bold mb-4 text-green-600">Şahmat Dahisi</h2>
                            <p className="text-gray-700">
                                Azərbaycanlı istedadlı şahmatçı, strateji dahiliyi və oyunu dərin başa düşməsi ilə tanınır.
                                Onun bir neçə gediş irəlidə düşünə bilmə qabiliyyəti onu güclü rəqib kimi fərqləndirir.
                                Daha ətraflı məlumat üçün klikləyin!
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

const TeymPage = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md m-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4 flex items-center">Chess Prodigy - Teymur  Abddullayev </h1>

            <FlippableCard />

            <div className="mt-8">
                <p className="text-lg leading-relaxed mb-4">
                    <span className="font-bold">EN:</span> Teymur Abdullayev is a remarkably talented chess player, known for his strategic brilliance and deep understanding of the game. His ability to think several moves ahead and anticipate his opponent's strategies sets him apart as a truly formidable competitor. Teymur's analytical skills and creativity in chess have earned him recognition in numerous tournaments, where he consistently demonstrates his exceptional intelligence and mastery of the game.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    What makes Teymur truly stand out is his unique approach to the game, blending classical techniques with innovative strategies. His adaptability and quick thinking have allowed him to outmaneuver many seasoned players, solidifying his reputation as a chess prodigy.
                </p>

                <br />
                <hr />
                <br />

                <p className="text-lg leading-relaxed">
                    <span className="font-bold">AZ:</span>Azərbaycanlı olduqca istedadlı şahmatçı, strateji dahiliyi və oyunu dərin başa düşməsi ilə tanınır. Onun bir neçə gediş irəlidə düşünə bilmə qabiliyyəti və rəqiblərinin strategiyalarını əvvəlcədən görməsi onu çox güclü bir rəqib kimi fərqləndirir. Teymurun analitik bacarıqları və şahmatda yaradıcı yanaşması ona bir çox turnirlərdə tanınma qazandırıb, burada o, daim qeyri-adi zəka və oyuna mükəmməl hakim olduğunu nümayiş etdirir.
                </p>
            </div>

            <div className="flex flex-row mt-8">
                <img className="w-80 h-80" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/dcpnfcn-aa852171-725a-400f-b837-b2d6774fdf4d.png/v1/fill/w_900,h_900/chess_piece_king_on_transparent_background__by_prussiaart_dcpnfcn-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvMjVkNDUwMTQtOGNjMy00Yzk4LWIwMmMtNWEwY2YzYTU1ZGRkXC9kY3BuZmNuLWFhODUyMTcxLTcyNWEtNDAwZi1iODM3LWIyZDY3NzRmZGY0ZC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.tObnyucxyQbSjiS7OYRvhS9hwwZiy5HCrTaQWBIhIQM" />
            </div>
        </div>
    )
}

export default TeymPage;