'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideMenu, { AllComponents } from './utils';
import { menuConfig, findComponentById } from './config';

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
                <div className='p-2 m-2 rounded-xl'>
                    {CurrentViewComponent && <CurrentViewComponent />}
                </div>
            </main>
        </div>
    );
};

export default UniversityPage;