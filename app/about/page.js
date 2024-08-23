'use client';
import { useState } from 'react';
import Image from 'next/image';
import aboutme from '@/assets/images/about/about_me.jpeg'
import { FaDownload } from 'react-icons/fa';
import { Typography } from '@material-tailwind/react';

export default function About() {
    const [activeTab, setActiveTab] = useState('about');

    const skills = ['Python', 'Bigdata', 'Pandas', 'JavaScript', 'Data Engineer', 'GraphQL', 'QA', 'Spark'];
    const projects = [];

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden relative">
                    <Typography variant="h6" className='absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center'>
                        <a href='/CV.pdf' download={'Rustam_Karimov_CV.pdf'}>Get CV <FaDownload className="inline-block mr-2" /></a>

                    </Typography>

                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <Image width={0} height={0} src={aboutme} alt='Rustam Karimov' className='h-48 w-full object-cover md:w-48' />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Software Engineer/Tutor/Influencer</div>
                            <a href="https://www.linkedin.com/in/rustam-karimov-7293315b/" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline" target='_blank'>Rustam Karimov</a>
                            <p className="mt-2 text-gray-500">A proficient software engineer with a robust aptitude for defining project structures, designing, and implementing relevant solutions to address challenges. With years of experience in the field, I demonstrate the capability to collaborate within a team, exhibit keen attention to detail, and possess solid analytical and programming skills.</p>
                        </div>
                    </div>

                    <div className="px-4 py-4 sm:px-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                {['about', 'skills', 'projects'].map((tab) => (
                                    <a
                                        key={tab}
                                        href="#"
                                        className={`${activeTab === tab
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveTab(tab);
                                        }}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="px-4 py-5 sm:p-6">
                        {activeTab === 'about' && (
                            <p className="text-gray-700">
                                <b>I'm Rustam Karimov, a Software Engineer </b> with a passion for tackling complex challenges in data processing and analysis. My journey in tech has been anything but conventional - starting from managing school networks in Azerbaijan to now developing big data solutions at UBS in Poland.

                                <br /> <br /> <b>What drives me?</b> It's the thrill of turning raw data into meaningful insights. Whether I'm optimizing code for performance, validating data integrity, or generating reports using Jinja templates, I'm always looking for ways to make data work smarter, not harder.
                                My background in both commerce and computer science gives me a unique perspective. I can bridge the gap between technical solutions and business needs, something I've found invaluable in my current role at UBS.
                                I'm proud of achieving🥇Gold Rank as a Certified Engineer, but I'm not one to rest on my laurels. I'm constantly pushing myself to learn more, whether that's diving deeper into cloud technologies like Azure or expanding my programming repertoire beyond Python and JavaScript.

                                <br /> <br /> <b>
                                    One of my most exciting experiences </b> was participating in a Global Hackathon. It tested my problem-solving skills under pressure and reinforced my belief in the power of collaboration in tech.
                                When I'm not knee-deep in code, you might find me working on personal projects like "HTML Pipe" or sharing my knowledge with others. I believe in the importance of giving back to the tech community that has given me so much.
                                In essence, I'm a problem solver at heart. Whether it's developing REST endpoints, optimizing big data processing, or finding innovative ways to present complex data, I'm always up for the challenge. And I bring this passion and drive to every project I tackle.
                            </p>
                        )}

                        {activeTab === 'skills' && (
                            <div className="flex flex-wrap -m-1">
                                {skills.map((skill) => (
                                    <span key={skill} className="m-1 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.name} className="bg-gray-50 p-4 rounded-lg shadow">
                                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                                        <p className="mt-1 text-gray-600">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Get in Touch</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>Feel free to reach out for collaborations or just a friendly <i>hello</i></p>
                        </div>
                        <div className="mt-5">
                            <a href="mailto:your.email@example.com" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}