import coursesData from '@/public/courses.json';
import Link from 'next/link';
const LearnWithRustamPage = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 underline">
                    Learn with Rustam - light version
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Welcome to my learning platform!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Join me on an exciting journey of knowledge and discovery. These    courses are designed to help you master new skills and achieve your goals.
                    </p>
                    <div className="space-y-4 mb-4">
                        <h3 className="text-xl font-medium ">
                            Featured Courses:
                        </h3>
                        <ul className="list-disc list-inside">
                            {coursesData.map(c => {
                                return (
                                    <li key={c.id} className='text-gray-600'>{c.title}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className='text-xl'>But this page is about:</h2>
                        <ul className="list-disc list-inside">
                            <Link href="/light/wecode"><li className='text-gray-600'> WeCode </li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnWithRustamPage;