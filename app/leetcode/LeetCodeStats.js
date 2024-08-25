'use client';
import { Typography, Card } from "@material-tailwind/react";

function StatsCard({ count, title, description, children }) {
    return (
        <Card color="transparent" shadow={false}>
            <Typography
                variant="gradient"
                className="text-4xl font-bold dark:text-gray-300"
                color="blue-gray"
            >
                {count}
            </Typography>
            <hr className="mt-2 mb-4 max-w-xs" />
            <Typography
                variant="h5"
                color="blue-gray"
                className="mt-1 font-bold dark:text-gray-300"
            >
                {title}
            </Typography>
            <Typography className="text-base max-w-xs font-normal leading-7 !text-gray-500">
                {description}
            </Typography>
            {children}
        </Card>
    );
}

export function LeetCodeStatsSection({ stats }) {

    Object.keys(stats.countByDifficulties).map(difficulty => { console.log(difficulty) })
    return (
        <>
            <div className="grid mt-16 w-full lg:h-[54rem] md:h-[34rem] place-items-center bg-center bg-contain bg-no-repeat">
                <div className="container mx-auto px-4 text-center">
                    <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 py-1 lg:px-4 px-1 font-medium text-primary">
                        Exciting Updates! Explore the latest LeetCode tasks
                    </Typography>
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mx-auto my-6 w-full leading-snug lg:!text-5xl dark:text-gray-300"
                    >
                        Discover a new level of{" "}
                        <span className="text-green-500 leading-snug ">
                            insight
                        </span>{" "}
                        and{" "}
                        <span className="leading-snug text-green-500">
                            challenge
                        </span>{" "}
                        through our curated LeetCode tasks.
                    </Typography>
                    <Typography
                        variant="lead"
                        className="mx-auto w-full !text-gray-500 lg:text-lg text-base dark:text-gray-300"
                    >
                        I’ve gathered and solved a variety of tasks to provide you with valuable insights and solutions.
                    </Typography>
                    <div className="mb-80">
                        <img
                            src="/imgs/leetcode1.png"
                            alt="LeetCode Tasks"
                            className="w-auto h-auto mb-80"
                        />
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <section className="lg:py-28 py-10 px-8 container mx-auto mt-2">
                <div className="grid gap-10 lg:grid-cols-1 lg:gap-24 xl:grid-cols-2 items-center">
                    <Card
                        className="bg-gray-100/50 py-24 text-center"
                        shadow={false}
                    >
                        <Typography
                            variant="h1"
                            className="!text-blue-500 !leading-snug text-5xl"
                        >
                            {stats.totalQuestions}
                        </Typography>
                        <Typography
                            variant="h5"
                            className="mt-2 font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                        >
                            LeetCode Task{stats.totalQuestions > 1 ? 's' : ''}
                        </Typography>
                    </Card>
                    <div>
                        <div className="grid lg:grid-cols-2 gap-10 gap-x-20">
                            <StatsCard
                                count={`${stats.averageDifficulty}/9`}
                                title="Average Difficulty"
                                description="An average difficulty rating for the tasks we've tackled."
                            >
                                <div className="flex flex-col mt-2">
                                    {Object.keys(stats.countByDifficulties).map(difficulty => {
                                        const count = stats.countByDifficulties[difficulty]
                                        return (
                                            <span key={difficulty} className={`text-lwr-leetcode-${difficulty.toLowerCase()}-100`}>
                                                {difficulty} question{count > 1 ? 's' : ''}: {count}
                                            </span>
                                        )

                                    })}
                                </div>
                            </StatsCard>
                            <StatsCard
                                count={stats.uniqueTopics}
                                title="Different Topics"
                                description="A diverse array of topics, such as Dynamic Programming, HashMap, Sorting, and more."
                            />

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LeetCodeStatsSection;
