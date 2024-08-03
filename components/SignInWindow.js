'use client';
import React from "react";
import { signIn, useSession } from "next-auth/react";
// @components
import {
    Card,
    Button,
    CardBody,
    CardHeader,
    Typography
} from "@material-tailwind/react";
import Image from "next/image";

import AddPhone from '@/components/AddPhone'


// @icons
import GithubLogo from '@/assets/images/github-mark.png';
const SignInWindow = ({ message, image_path, width }) => {
    const { data: session, status } = useSession();

    return (
        <section className="px-8">

            {status === 'unauthenticated' ?
                (
                    <div className="container mt-12 mb-12 mx-auto grid place-items-center">
                        <Card
                            shadow={false}
                            className="md:px-24 md:py-14 py-8 border border-gray-300 dark:bg-gray-800 dark:border-none"
                        >
                            <CardHeader shadow={false} floated={false} className="flex flex-col items-center text-center dark:bg-gray-800">
                                <img src={image_path} width={width} alt="login_1" />

                                <Typography className="text-gray-600 text-[18px] font-normal md:max-w-sm dark:text-white">
                                    {message}
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                <form
                                    action="#"
                                    className="flex flex-col gap-4 md:mt-2"
                                >
                                    <Button
                                        variant="outlined"
                                        size="lg"
                                        className="flex h-12 bg-white border-blue-gray-200 items-center justify-center gap-2"
                                        onClick={() => signIn("google")}
                                        fullWidth
                                    >
                                        <img
                                            src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                            alt="google"
                                            className="h-6 w-6"
                                        />{" "}
                                        sign in with Google
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="lg"
                                        className="flex h-12 bg-white border-blue-gray-200 items-center justify-center gap-2"
                                        onClick={() => signIn("github")}
                                        fullWidth
                                    >
                                        <Image
                                            src={GithubLogo}
                                            alt="github"
                                            width={0}
                                            height={0}
                                            className="h-6 w-6"
                                        />{" "}
                                        sign in with GitHub
                                    </Button>
                                    <Typography
                                        variant="small"
                                        className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600 "
                                    >
                                        Upon signing in, you consent to abide by our{" "}
                                        <a href="/signin/terms_and_privacy#terms" className="text-gray-900 dark:text-white">
                                            Terms of Service
                                        </a>{" "}
                                        &{" "}
                                        <a href="/signin/terms_and_privacy#privacy" className="text-gray-900 dark:text-white">
                                            Privacy Policy.
                                        </a>
                                    </Typography>
                                </form>
                            </CardBody>
                        </Card >
                    </div >
                ) : (
                    <div className="container mt-12 mb-12 mx-auto grid place-items-center">
                        <Card
                            shadow={false}
                            className="md:px-24 md:py-14 py-8 border border-gray-300 dark:bg-gray-800 dark:border-none"
                        >
                            <CardHeader shadow={false} floated={false} className="flex flex-col items-center text-center dark:bg-gray-800">
                                <img src={'imgs/welcome_1.png'} width={"150px"} alt="welcome_1" />

                                <Typography variant="h4" className="text-gray-900 md:max-w-sm dark:text-white">
                                    Welcome,
                                </Typography>
                                <Typography variant="h2" color="blue" textGradient className="md:max-w-sm dark:text-white">
                                    {session.user?.name}
                                </Typography>

                                {!session.user.phone ?
                                    (<div className="flex flex-col items-center">
                                        <Typography>
                                            Before we continue, you need to add your phone number:
                                        </Typography>
                                        <AddPhone />
                                    </div>
                                    ) :
                                    <>

                                        <Typography variant="lead" className="mb-2">
                                            You can now view course details, register for them, and directly reach out to me.
                                        </Typography>
                                        <a href="/">
                                            <Button variant="filled" size="sm">
                                                Start Journey
                                            </Button>
                                        </a>
                                    </>
                                }
                                <Typography>
                                </Typography>
                            </CardHeader>
                        </Card>
                    </div>
                )
            }

        </section>
    )
}

export default SignInWindow;