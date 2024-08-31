import Link from "next/link";

import SalmanFront from './salman.jpg';
import SalmanBack from './salman2.jpeg';
import FC from '@/app/(light)/light/people/FlippableCard'

const SalmanPage = () =>
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg m-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4 flex items-center">
            iOS Developer - Salman Abdullayev
        </h1>
        <FC frontTitle={"iOS Developer"} backTitle={"iOS Developer"} frontImage={SalmanFront} backImage={SalmanBack} frontText={"Salman Abdullayev is an iOS Developer with extensive knowledge and experience in mobile development. His expertise includes modern technology applications and performance optimization. Click to learn more!"} backText={"Salman Abdullayev, iOS proqramlaşdırma sahəsində geniş bilik və təcrübəyə malikdir. Onun təcrübəsi, müasir texnologiyaların tətbiqi və performans optimizasiyası sahələrində genişdir. Daha ətraflı məlumat üçün klikləyin!"} />


        <div className="mt-8">
            <div className="text-gray-700" id="AZ">
                <p className="leading-relaxed text-2xl">
                    Salman Abdullayev iOS proqramlaşdırma sahəsində geniş bilik və təcrübəyə malikdir. Onun təcrübəsi müasir texnologiyaların tətbiqi və performans optimizasiyası sahələrində genişdir.
                </p>

                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
                    <p>
                        Samux şəhərində doğulmuşdur və hal-hazırda da Samuxda yaşayıb Gəncədə işləyir. Salman, Ekosistema Alfa-da iOS Developer olaraq, UIKit və SwiftUI istifadə edərək istifadəçi interfeysləri hazırlamış, şəbəkə tələbləri və JSON məlumatlarının emalı ilə məşğul olmuşdur. Azercell Telecom LLC-də müştəri sorğuları və müraciətləri ilə məşğuldur. O, həmçinin müştəri məlumatlarını təqdim edir və müştəri şikayətlərini qeyd edir.
                    </p>

                    <p className="mb-3">
                        Salman proqramlaşdırma sahəsində geniş bilik və təcrübəyə malikdir. O, müasir texnologiyaların tətbiqi və performans optimizasiyası ilə tanınır. Samux şəhərində doğulmuş və Bakıda yaşamaqla müvafiq bilik və təcrübələrini artırmışdır. O, iOS proqramlaşdırma sahəsində öz mükəmməl yanaşmaları ilə tanınır.
                    </p>

                    <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                        <p className="italic">
                            "Proqramlaşdırma mənim üçün yalnız bir peşə deyil, həm də bir tutku! Hər yeni layihə mənə yeni bir öyrənmə imkanları təqdim edir və hər bir kod parçası mənim yaradıcılıq sərhədlərimi genişləndirir."
                        </p>
                        <svg className="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <p className="font-bold text-gray-700 text-xl">
                            Salman Abdullayev
                        </p>
                    </blockquote>

                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Salman geniş iOS proqramlaşdırma biliklərinə malikdir və müxtəlif beynəlxalq layihələrdə iştirak etmişdir. O, müasir texnologiyaların tətbiqi və performans optimizasiyası ilə tanınır. Samux şəhərində doğulmuş və Bakıda uzun illər yaşamışdır.
                    </p>
                </div>

                <p className="mb-3">
                    Salman və onun nailiyyətləri haqqında daha ətraflı məlumat əldə etmək üçün <Link href="https://www.linkedin.com/in/salmanabdullayev/" target="_blank" className="text-blue-500 hover:underline">LinkedIn </Link> profilini və <Link href="mailto:abdullayev233@gmail.com" target="_blank" className="text-blue-500 hover:underline"> e-poçt </Link> ünvanını ziyarət edin.
                </p>
            </div>

            <br />
            <hr />
            <br />

            <div className="text-gray-900" id="EN">
                <p className="leading-relaxed text-2xl">
                    Salman Abdullayev is an iOS Developer with extensive knowledge and experience in mobile development. His expertise includes modern technology applications and performance optimization.
                </p>

                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
                    <p>
                        Born in Samukh and currently residing in Samkh and working in Gandja, Salman has worked as an iOS Developer at Ekosistema Alfa, where he developed user interfaces using UIKit and SwiftUI and handled network requests and JSON data processing. At Azercell Telecom LLC, he manages customer inquiries and complaints, providing valuable information and addressing customer issues.
                    </p>

                    <p className="mb-3">
                        Salman is recognized for his extensive knowledge and experience in programming, with a focus on modern technology applications and performance optimization. Born in Samukh and residing in Baku, he has enhanced his skills and expertise in the field of iOS programming.
                    </p>

                    <blockquote className="mb-3 border-l-4 border-gray-500 pl-4 text-gray-500">
                        <p className="italic">
                            "Programming is not just a profession for me; it’s a passion! Each new project presents new learning opportunities, and each piece of code expands my creative boundaries."
                        </p>
                        <svg className="w-8 h-8 mt-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <p className="font-bold text-gray-700 text-xl">
                            Salman Abdullayev
                        </p>
                    </blockquote>

                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                        Salman has extensive knowledge of iOS programming and has participated in various international projects. He is known for his modern technology applications and performance optimization skills. Born in Samukh and having lived in Baku for many years, he has achieved significant success in the field of programming.
                    </p>
                </div>

                <p className="mb-3">
                    To learn more about Salman and his achievements, visit his <Link href="https://www.linkedin.com/in/salmanabdullayev/" target="_blank" className="text-blue-500 hover:underline">LinkedIn</Link> profile and <Link href="mailto:abdullayev233@gmail.com" target="_blank" className="text-blue-500 hover:underline">email</Link> address.
                </p>
            </div>
        </div>
    </div>

export default SalmanPage;
