import Link from "next/link";

import RasulFront from './rasul.jpeg';
import RasulBack from './rasul2.jpeg';
import FC from '@/app/(light)/light/people/FlippableCard'

const RasulPage = () =>
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg m-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4 flex items-center">
            Programming Expert - Rasul Karimov
        </h1>

        <FC frontTitle={"Programming Expert"} backTitle={"Proqramlaşdırma Eksperti"} frontImage={RasulFront} backImage={RasulBack} frontText={"Rasul Karimov is a renowned programming expert with extensive knowledge and experience in the field. His analytical thinking and creative approaches have made him a prominent figure in technology. Click to learn more!"} backText={"Rəsul Kərimov, proqramlaşdırma və texnologiya sahəsində geniş bilik və təcrübəyə malikdir. Onun analitik düşüncə tərzi və yaradıcı yanaşmaları onu bu sahədə tanınmış bir mütəxəssis etmişdir. Daha ətraflı məlumat üçün klikləyin!"} />

        <div className="mt-8">
            <div className="text-gray-700" id="AZ">
                <p className="leading-relaxed text-2xl">
                    Rəsul Kərimov proqramlaşdırma sahəsində yüksək bilik və təcrübəyə malikdir. Onun analitik düşüncə tərzi və yaradıcı yanaşmaları onu bu sahədə tanınmış bir mütəxəssis etmişdir.
                </p>




                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
                    <p>
                        Gəncə şəhərində doğulmuş və uzun illər Rusiyanın Moskva şəhərində yaşamışdır. Rəsul, ShareChat-də Machine Learning Engineer olaraq çalışan müddətində istifadəçi iştirakını və məzmun tövsiyəsini artıran alqoritmlərin inkişafı üzərində çalışmışdır. Yandex-də Machine Learning Engineer kimi, axtarış mühərriklərinin alqoritmlərini və tövsiyə sistemlərini yaxşılaşdırmaq məqsədilə müxtəlif ML layihələrində iştirak etmişdir. Skolkovo Elmi və Texnologiya İnstitutunda Deep Learning Engineer olaraq, kompüter görmə və təbii dil işləmə sahələrində dərin öyrənmə modelləri üzərində işləmişdir. Samsung Electronics-də Deep Learning Researcher olaraq, görüntü və danışıq tanıma texnologiyalarını inkişaf etdirmək məqsədilə dərin öyrənmə texnikaları üzərində işləməyə davam etmişdir.
                    </p>

                    <p className="mb-3">
                        Rəsul proqramlaşdırma sahəsində analitik düşüncə qabiliyyəti və innovativ yanaşması ilə tanınır. Onun yaradıcı və strateji yanaşmaları, müxtəlif beynəlxalq layihələrdə və mühitlərdə müvəffəqiyyət əldə etməsinə kömək edib. Gəncə şəhərində doğulmuş və Moskva şəhərində uzun illər yaşamışdır, burada o, proqramlaşdırma sahəsində yüksək müvəffəqiyyətlər əldə edib. Rəsul Kərimov proqramlaşdırma sahəsindəki mükəmməl yanaşmaları ilə tanınır. O, ShareChat-də Machine Learning Engineer kimi istifadəçi iştirakını və məzmun tövsiyəsini artıran alqoritmlərin inkişafı ilə məşğuldur.
                    </p>

                    <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                        <p className="italic">
                            "Proqramlaşdırma mənim üçün yalnız bir peşə deyil! Bu, həyatımın ayrılmaz bir hissəsidir. Hər bir layihə mənə yeni bir sınaq təqdim edir, hər bir yaradıcı yanaşma isə mənim intellektual sərhədlərimi genişləndirir. Hər bir kod parçası, mənim üçün həm bir mübarizə, həm də yaradıcılıq meydanı olur."
                        </p>
                        <svg className="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <p className="font-bold text-gray-700 text-xl">
                            Rəsul Kərimov
                        </p>
                    </blockquote>
                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Əvvəllər Yandex-də axtarış mühərriklərinin alqoritmlərini yaxşılaşdırmış, Skolkovo Elmi və Texnologiya İnstitutunda dərin öyrənmə modelləri üzərində işləmiş və Samsung Electronics-də danışıq tanıma texnologiyalarını inkişaf etdirmişdir. Gəncə şəhərində doğulmuş və Moskva şəhərində uzun illər yaşamışdır.
                    </p>


                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        O, proqramlaşdırma sahəsindəki mükəmməl yanaşmaları ilə tanınır və beynəlxalq səviyyədə bir çox layihələrdə iştirak etmişdir. Gəncə şəhərində doğulmuş və Moskva şəhərində uzun illər yaşamışdır, burada proqramlaşdırma sahəsindəki bilik və təcrübələrini artırmışdır.
                    </p>
                </div>

                <p className="mb-3">
                    Rəsul və onun nailiyyətləri haqqında daha ətraflı məlumat əldə etmək üçün <Link href="https://www.linkedin.com/in/rrkarimm/" target="_blank" className="text-blue-500 hover:underline">LinkedIn </Link> və <Link href="https://www.linkedin.com/in/rrkarimm/" target="_blank" className="text-blue-500 hover:underline">Github</Link> profillərini ziyarət edin.
                </p>
            </div>

            <br />
            <hr />
            <br />

            <div className="text-gray-900" id="EN">
                <p className="leading-relaxed text-2xl">
                    Rasul Karimov is a distinguished programming expert with extensive knowledge and experience in the field. His analytical thinking and creative approaches have made him a prominent figure in technology.
                </p>




                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">

                    <p>
                        Born in Ganja and having lived in Moscow for many years, Rasul has made significant strides in his career. At ShareChat, as a Machine Learning Engineer, he has worked on developing algorithms that enhance user engagement and content recommendation. During his time at Yandex, he contributed to improving search engine algorithms and recommendation systems. As a Deep Learning Engineer at Skolkovo Institute of Science and Technology, he worked on deep learning models for computer vision and natural language processing. At Samsung Electronics, as a Deep Learning Researcher, he focused on advancing deep learning techniques for image and speech recognition technologies.
                    </p>
                    <p className="mb-3">
                        Rasul is recognized for his analytical thinking and innovative approach in programming. His creative and strategic methods have contributed to his success in various international projects and environments. Born in Ganja and having lived in Moscow for many years, he has achieved remarkable success in programming. Rasul Karimov is known for his exceptional programming skills and his work with international projects. He has worked as a Machine Learning Engineer at ShareChat, focusing on algorithms to enhance user engagement.
                    </p>
                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Previously, at Yandex, he worked on improving search engine algorithms and recommendation systems. At Skolkovo Institute of Science and Technology, he specialized in deep learning models, and at Samsung Electronics, he advanced deep learning techniques for image and speech recognition. Born in Ganja and having spent many years in Moscow, his extensive experience has contributed to his high achievements in programming.
                    </p>

                    <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                        <p className="italic">
                            "For me, programming is not just a profession! It is an integral part of my life. Every project presents a new challenge, and every creative approach expands my intellectual boundaries. Every piece of code is both a struggle and a creative arena for me."
                        </p>
                        <svg className="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <p className="font-bold text-gray-700 text-xl">
                            Rasul Karimov
                        </p>
                    </blockquote>

                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Rasul is recognized for his exceptional programming skills and has participated in numerous international projects. Born in Ganja and having spent many years in Moscow, he has achieved significant milestones in programming.
                    </p>
                </div>

                <p className="mb-3">
                    For more details about Rasul and his achievements, visit his <Link href="https://www.linkedin.com/in/rrkarimm/" target="_blank" className="text-blue-500 hover:underline">visit his LinkedIn profile</Link> and <Link href="https://github.com/rrkarim" target="_blank" className="text-blue-500 hover:underline"> Github</Link>
                </p>
            </div>
        </div>
    </div>
export default RasulPage;