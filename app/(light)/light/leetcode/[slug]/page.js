'use client';
import { fetchEachQuestionMD } from '../../../../(pro)/leetcode/utils'
import { useState, useEffect } from 'react'
import Giscus from '@/components/pro/Giscus';


const SimplePageSlug = ({ params }) => {

    const { slug } = params;

    const [question, setQuestion] = useState({})
    console.log(slug)
    useEffect(() => {
        const getQuestion = async () => {
            try {

                setQuestion(await fetchEachQuestionMD(slug))
            } catch (error) {
                console.error('Error:', error)
            }
        }


        getQuestion();
    }, [])


    return (
        <div className='flex flex-col m-8'>
            <h3 className='font-bold text-gray-700 italic'>Title: {question.title}</h3>
            <h3 className='mb-4 font-bold text-gray-700'>Level: {question.level}</h3>

            <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: question.content }} />
            <Giscus />
        </div>

    )
}

export default SimplePageSlug;