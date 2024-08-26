import React, { useState } from 'react';
import { Typography, Stepper, Step } from '@material-tailwind/react';
import { TbArrowsJoin2, TbPlugConnected } from "react-icons/tb";
import { MdOutlineFollowTheSigns } from "react-icons/md";
import { AiTwotoneBook } from "react-icons/ai";
const features = [
    {
        name: 'Join',
        description: 'Create a free account using your email or social accounts. It\'s a quick process, taking just 2-3 minutes.',
        icon: TbArrowsJoin2,
    },
    {
        name: 'Connect',
        description: 'After evaluation, you\'ll be invited to join the channel that aligns best with your current level.',
        icon: TbPlugConnected,
    },
    {
        name: 'Follow',
        description: 'Stay on track by regularly checking updates, participating in discussions, and keeping up with new assignments.',
        icon: MdOutlineFollowTheSigns,
    },
    {
        name: 'Learn',
        description: 'Focus on learning, join sessions on time, follow instructions closely, and complete tasks.',
        icon: AiTwotoneBook,
    },
];

const Features = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStepClick = (index) => {
        setActiveStep(index);
    };

    return (
        <div id="features" className="scroll-mt-[450px] sm:scroll-mt-32 mb-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <Typography className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white">
                        Enjoy the <span className="text-lwr-orange-color-100">virtual</span> classes
                    </Typography>
                    <Typography className="mt-6 text-lg font-normal lg:text-xl text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1">
                        Immerse yourself in a rich learning environment where collaboration and interaction are key.
                        Each class is designed to be engaging and informative, providing you with the tools and knowledge needed to succeed.
                    </Typography>
                </div>
                <div className="mx-auto mt-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl">
                    <Stepper activeStep={activeStep}>
                        {features.map((feature, index) => (
                            <Step
                                key={feature.name}
                                onClick={() => handleStepClick(index)}
                                completed={index < activeStep}
                                className={`w-16 sm:w-40 cursor-pointer bg-lwr-orange-color-100 text-xs sm:text-sm`}
                            >
                                {feature.name}
                            </Step>
                        ))}
                    </Stepper>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature, index) => (
                            <FeatureItem key={feature.name} {...feature} active={index === activeStep} />
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ name, description, icon: Icon, active }) => (
    <div className={`relative pl-16 pb-[50px] pt-[10px] ${active ? 'bg-gray-100 dark:bg-gray-800 rounded-lg' : ''}`}>
        <dt className="text-base font-semibold leading-7 text-left text-gray-900 text-lwr-orange-color-100 flex items-center">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lwr-blue-color-600 m-2">
                <Icon className="h-6 w-6 text-white" />
            </div>
            {name}
        </dt>
        <dd className="mt-2 text-base leading-7 text-left text-lwr-general-blue-light-theme-color-1 dark:text-lwr-general-gray-dark-theme-color-1">{description}</dd>
    </div>
);

export default Features;
