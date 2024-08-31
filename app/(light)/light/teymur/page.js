'use client';
import Image from "next/image";
import Teymur from './teymur.jpg'
import Teymur2 from './teymur2.jpg'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { GiClick } from "react-icons/gi";
import Link from "next/link";



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
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg m-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4 flex items-center">Chess Prodigy - Teymur  Abddullayev </h1>

            <FlippableCard />

            <div className="mt-8">

                <div id="EN">
                    <p className="leading-relaxed text-xl">
                        <span className="font-bold">EN:</span> Azerbaijani prodigy chess player, known for his strategic brilliance and deep understanding of the game. His ability to think several moves ahead and anticipate his opponents' strategies sets him apart as a very strong competitor. Teymur’s analytical skills and creative approach in chess have earned him recognition in many tournaments, where he consistently demonstrates extraordinary intelligence and mastery of the game.
                    </p>

                    <p className="mb-3">
                        Teymur Abdullayev is a talented chess player renowned for his strategic depth and excellent understanding of the game. He distinguishes himself by being able to think several moves ahead during play and by anticipating his opponents' strategies. His unique approach and innovative strategies have established him as a true genius in the chess world.
                    </p>

                    <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            Azerbaijani prodigy chess player Teymur Abdullayev is known for his strategic brilliance and deep understanding of the game. His ability to think several moves ahead and to mislead opponents with unexpected moves sets him apart as a strong and strategically minded player. Teymur has affirmed his position through victories in various international tournaments and has successfully competed against many chess masters.
                        </p>

                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            Teymur Abdullayev has proudly represented the Samux region of Azerbaijan, making this region known internationally. Samux, famous for its rich history and cultural heritage, has benefited from Teymur’s chess achievements in gaining international recognition. He received his education at School Number 1 in Samux, where he developed his skills in chess and other intellectual games.
                        </p>

                        <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                            <p className="italic">
                                "For me, this is not just a game! Chess is an integral part of my life. Every move presents a new challenge, and every strategic decision expands my intellectual boundaries. Every moment at the chessboard is both a struggle and a creative arena for me."
                            </p>
                            <svg class="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <p className="font-bold text-gray-700 text-xl">
                                Teymur Abdullayev
                            </p>
                        </blockquote>

                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            It is worth emphasizing that chess is not just a game for Teymur but an integral part of his life. Each move on the chessboard represents both a challenge and a creative arena for him. His strategic and analytical thinking provides him with significant advantages both at the chessboard and in daily life. His years at the Samux school laid a solid foundation for the development of modern chess strategies and his recognition for innovative playstyle.
                        </p>
                    </div>

                    <p className="mb-3">
                    </p>
                    <p className="mb-3">
                        Additionally, use various tools to improve your project management processes. This will help you track project tasks and ensure better communication among team members. For more detailed information, <a href="https://www.chess.com/member/killer1996" target="blank" className="text-blue-500 hover:underline">click here!</a>
                    </p>
                </div>


                <br />
                <hr />
                <br />



                <div className="text-gray-700" id="AZ">
                    <p className="leading-relaxed text-xl">
                    <span className="font-bold">AZ:</span>Azərbaycanlı olduqca istedadlı şahmatçı, strateji dahiliyi və oyunu dərin başa düşməsi ilə tanınır. Onun bir neçə gediş irəlidə düşünə bilmə qabiliyyəti və rəqiblərinin strategiyalarını əvvəlcədən görməsi onu çox güclü bir rəqib kimi fərqləndirir. Teymurun analitik bacarıqları və şahmatda yaradıcı yanaşması ona bir çox turnirlərdə tanınma qazandırıb, burada o, daim qeyri-adi zəka və oyuna mükəmməl hakim olduğunu nümayiş etdirir.
                </p>

                    <p className="mb-3">
                        Teymur Abdullayev, strateji dərinliyi və mükəmməl oyun anlayışı ilə tanınan istedadlı bir şahmatçıdır. O, oyun zamanı bir neçə gediş irəlidə düşünmə qabiliyyəti ilə fərqlənir və rəqiblərinin strategiyalarını qabaqcadan görmə bacarığına malikdir. Onun bu unikal yanaşması və innovativ strategiyaları onu şahmat aləmində əsl bir dahi kimi tanıtmışdır.
                    </p>

                    <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">

                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            Azərbaycanlı istedadlı şahmatçı Teymur Abdullayev, şahmat dünyasında strateji dahiliyi və oyunu dərin başa düşməsi ilə tanınır. Onun bir neçə gediş irəlidə düşünə bilmə qabiliyyəti, gözlənilməz addımlarla rəqiblərini yanıltmaq bacarığı onu güclü və strateji düşüncəyə malik bir oyunçu kimi fərqləndirir. Teymur, müxtəlif beynəlxalq turnirlərdə qazandığı qələbələrlə özünü təsdiqləyib və çoxlu sayda şahmat ustalarına qarşı müvəffəqiyyətlə mübarizə aparıb.
                        </p>
                        <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                            <p className="italic">
                                "Bu mənim üçün sadəcə oyun deyil! Şahmat, həyatımın ayrılmaz bir hissəsidir. Hər bir gediş mənə yeni bir sınaq təqdim edir, hər bir strateji seçim isə mənim intellektual sərhədlərimi genişləndirir. Şahmat masasında hər bir an, mənim üçün həm bir mübarizə, həm də yaradıcılıq meydanı olur."
                            </p>
                            <svg class="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <p className="font-bold text-gray-700 text-xl">
                                Teymur Abdullayev
                            </p>
                        </blockquote>
                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            Teymur Abdullayev, Azərbaycanın Samux rayonunun fəxri olaraq, bu regionun adını beynəlxalq arenada tanıdıb. Samux, zəngin tarixi və mədəni irsi ilə məşhur olan bir bölgədir və Teymurun şahmat sahəsindəki uğurları bu bölgənin beynəlxalq səviyyədə tanınmasına kömək edib. O, Samuxda yerləşən 1 nömrəli məktəbdə təhsil almışdır, burada şahmat və digər intellektual oyunlar üzrə bacarıqlarını inkişaf etdirmişdir.
                        </p>

                        <p class="mb-3 text-gray-700 dark:text-gray-300">
                            Şahmatın Teymur üçün yalnız bir oyun deyil, həyatın ayrılmaz bir hissəsi olduğunu vurğulamaq istərdim. Şahmat masasında hər bir gediş, onun üçün həm bir sınaq, həm də yaradıcılıq meydanı olur. Teymurun strategiya və analitik düşüncə qabiliyyəti, onun şahmat masasında olduğu kimi gündəlik həyatda da böyük üstünlük təmin edir. Samux məktəbindəki illəri, onun müasir şahmat strategiyalarını inkişaf etdirməsi və innovativ oyun tərzi ilə tanınması üçün möhkəm bir əsas yaratmışdır.
                        </p>



                    </div>

                    <p className="mb-3">
                    </p>
                    <p className="mb-3">
                        Əlavə olaraq, layihə idarəetmə proseslərinizin təkmilləşdirilməsi üçün müxtəlif vasitələrdən istifadə edin. Bu, layihə tapşırıqlarınızı izləməyi və komanda üzvləri arasında daha yaxşı əlaqə qurmağı təmin edəcək.
                        Daha ətraflı məlumat üçün <Link href="https://www.chess.com/member/killer1996" target="blank" className="text-blue-500 hover:underline">klikləyin! </Link>

                    </p>
                </div>

            </div>

            <div className="flex flex-row mt-8">
                <img className="w-80 h-80" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/dcpnfcn-aa852171-725a-400f-b837-b2d6774fdf4d.png/v1/fill/w_900,h_900/chess_piece_king_on_transparent_background__by_prussiaart_dcpnfcn-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvMjVkNDUwMTQtOGNjMy00Yzk4LWIwMmMtNWEwY2YzYTU1ZGRkXC9kY3BuZmNuLWFhODUyMTcxLTcyNWEtNDAwZi1iODM3LWIyZDY3NzRmZGY0ZC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.tObnyucxyQbSjiS7OYRvhS9hwwZiy5HCrTaQWBIhIQM" />
            </div>
        </div>
    )
}

export default TeymPage;