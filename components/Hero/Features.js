import { Typography } from '@material-tailwind/react'
import { TbArrowsJoin2, TbPlugConnected } from "react-icons/tb";
import { MdOutlineFollowTheSigns } from "react-icons/md";
import { AiTwotoneBook } from "react-icons/ai";




const features = [
    {
        name: 'Join',
        description:
            `Open a free account on Slack using either your email address or social accounts such as Google account or Apple ID. 
            The process will take 2-3 minutes of your time. While registering, please use your real name and surname for authenticity. Username can be whatever you prefer.`,
        icon: TbArrowsJoin2,
    },
    {
        name: 'Connect',
        description:
            `Once I have thoroughly assessed and evaluated your skills, 
            I will extend an invitation for you to join the channel that best suits your current knowledge level. 
            You can trust me to handle this properly.`,
        icon: TbPlugConnected,
    },
    {
        name: 'Follow',
        description:
            `TBA`,
        icon: MdOutlineFollowTheSigns,
    },
    {
        name: 'Learn',
        description:
            `Learning is the most important part of the journey. You will need to stay focused. 
            Join on time, follow the instructions and complete tasks. Good luck!`,
        icon: AiTwotoneBook,
    },
]

export default function Features() {
    return (
        <div id="features" className="sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <Typography
                        className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-500 md:text-5xl dark:text-white"
                    >
                        Enjoy the <span className="text-lwr-orange-100">virtual</span> classes
                    </Typography>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                        pulvinar et feugiat blandit at. In mi viverra elit nunc.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-lwr-orange-100">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lwr-blue-500">
                                        <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 hover:text-lwr-orange-100">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}