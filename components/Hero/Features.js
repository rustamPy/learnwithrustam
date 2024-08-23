import { Typography } from '@material-tailwind/react'
import { TbArrowsJoin2, TbPlugConnected } from "react-icons/tb";
import { MdOutlineFollowTheSigns } from "react-icons/md";
import { AiTwotoneBook } from "react-icons/ai";

const features = [
    {
        name: 'Join',
        description:
            `Create a free Slack account using your email or social accounts like Google or Apple ID. 
            It’s a quick process, taking just 2-3 minutes. Be sure to use your real name for authenticity, 
            though you can choose any username you like.`,
        icon: TbArrowsJoin2,
    },
    {
        name: 'Connect',
        description:
            `After I’ve evaluated your skills, 
            I’ll invite you to join the channel that aligns best with your current level. 
            You can trust that I’ll make the right choice for you.`,
        icon: TbPlugConnected,
    },
    {
        name: 'Follow',
        description:
            `Staying on track is key to your growth. Ensure you regularly check updates, participate in discussions, and keep up with new assignments. 
            Engage with your peers, ask questions, and share insights—collaboration is a powerful learning tool. 
            By following the community guidelines and actively contributing, you'll not only enhance your own learning but also support others in their journey. Stay committed, and you'll see continuous progress.`,
        icon: MdOutlineFollowTheSigns,
    },
    {
        name: 'Learn',
        description:
            `Learning is the most crucial part of this journey. Stay focused, join sessions on time, 
            follow the instructions closely, and complete the tasks. Wishing you the best of luck!`,
        icon: AiTwotoneBook,
    },
]

export default function Features() {
    return (
        <div id="features" className="sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <Typography
                        className="mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight leading-none text-lwr-gray-color-500 md:text-5xl dark:text-white"
                    >
                        Enjoy the <span className="text-lwr-orange-color-100">virtual</span> classes
                    </Typography>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Immerse yourself in a rich learning environment where collaboration and interaction are key.
                        Each class is designed to be engaging and informative, providing you with the tools and knowledge needed to succeed.
                        Take advantage of the opportunities to connect with your peers and instructors,
                        and make the most of this virtual learning journey.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-left text-gray-900 dark:text-lwr-orange-color-100">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lwr-blue-color-500">
                                        <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-left text-gray-600 hover:text-lwr-orange-color-100">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}