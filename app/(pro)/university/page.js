'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideMenu, { AllComponents } from './utils';
import { menuConfig, findComponentById } from './config';
import { ShieldX } from 'lucide-react';

const EmptyPage = () => {
    return (
        <div className='flex items-center justify-center h-screen text-lg'>
            <div className='flex flex-col items-center'>
                <ShieldX className='w-24 h-24 dark:text-gray-900' />
                <p className='dark:text-gray-900'>I'm working on this page...</p>
            </div>
        </div>
    )

}

const UniversityPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentId = searchParams.get('id') || 'home';

    const currentComponent = findComponentById(currentId);

    const handleComponentSelect = (id) => {
        router.push(`/university?id=${id}`);
    };

    const CurrentViewComponent = currentComponent ? AllComponents[currentComponent] : null;

    return (
        <div className="flex h-screen bg-gray-200">
            <SideMenu
                config={menuConfig}
                onComponentSelect={handleComponentSelect}
                currentId={currentId}
            />
            <main className="flex-1 overflow-y-auto">
                <div className='p-1 m-1 rounded-xl'>
                    {CurrentViewComponent ? <CurrentViewComponent /> : <EmptyPage />}
                </div>
            </main>
        </div>
    );
};

export default UniversityPage;