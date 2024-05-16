import React, { ReactNode } from 'react'

const InfoBox: React.FC<({ id: number, heading: string, children: string, button: object, bg: string })> = ({
    id,
    heading,
    children,
    button,
    bg
}) => {
    return (
        <>
            <div id={`info-box-${id}`} className="p-6 rounded-lg shadow-md" style={{ backgroundColor: bg }}>
                <h2 className="text-2xl font-bold">{heading}</h2>
                <p className="mt-2 mb-4">
                    {children}
                </p>
                <a
                    href={button.link}
                    className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                    {button.text}
                </a>
            </div>
        </>
    )
}

export default InfoBox