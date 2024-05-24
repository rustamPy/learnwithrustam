'use client';
import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link';

const InfoBox: React.FC<({ id: number, heading: string, children: string, button: object, bg: string })> = ({
    id,
    heading,
    children,
    button
}) => {
    const theme = localStorage.getItem('theme') === 'light' ? 'white' : 'white';
    return (
        <>
            <div id={`info-box-${id}`} className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme }}>
                <h2 className="text-2xl font-bold">{heading}</h2>
                <p className="mt-2 mb-4">
                    {children}
                </p>
                <Link
                    href={button.link}
                    className="inline-block rounded-lg px-4 py-2"
                >
                    {button.text}
                </Link>
            </div>
        </>
    )
}

export default InfoBox