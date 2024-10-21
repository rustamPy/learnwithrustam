'use client';
import React, { useState } from 'react';
import SideMenu, { AllComponents } from './utils';
import { menuConfig } from './config';

const App = () => {
    const [currentComponent, setCurrentComponent] = useState('HomeworkView');

    const handleComponentSelect = (componentName) => {
        setCurrentComponent(componentName);
    };

    const CurrentViewComponent = AllComponents[currentComponent];

    return (
        <div className="flex h-screen bg-gray-200">
            <SideMenu config={menuConfig} onComponentSelect={handleComponentSelect} />
            <main className="flex-1 overflow-y-auto">
                <div className='p-4 m-2 border rounded-xl bg-white'>
                    {CurrentViewComponent && <CurrentViewComponent />}
                </div>
            </main>
        </div>
    );
};

export default App;