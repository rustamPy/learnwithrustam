'use client';
import React from 'react'

import InfoBox from '@/components/InfoBox';

const InfoBoxes = () => {
    const boxes = [{
        id: 0,
        heading: 'For Renters',
        children: 'Find your dream rental property. Bookmark properties and contact owners.',
        button: {
            link: "/properties",
            text: "Browse Properties"
        },
        bg: 'red'
    },
    {
        id: 1,
        heading: 'For Property Owners',
        children: 'List your properties and reach potential tenants. Rent as an airbnb or long term.',
        button: {
            link: "/add-property",
            text: "Add Property",
        },
        bg: 'red'
    }]
    return (    
        <>
            {/* <!-- Renters and Owners --> */}
            <section>
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                        {boxes.map(box => (<InfoBox key={box.id} {...box} bg={localStorage.getItem('theme')}> {box.children} </InfoBox>))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default InfoBoxes