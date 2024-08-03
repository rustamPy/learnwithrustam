'use client';
import React from "react";
import SignInWindow from '@/components/SignInWindow';

function SignIn() {

    return (
        <SignInWindow message={'Please, sign-in to continue'}
            image_path={'/imgs/login_1.png'}
            width={"100px"} />
    );
}

export default SignIn;