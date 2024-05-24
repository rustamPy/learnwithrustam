import properties from '@/components/properties.json'
import FeaturedPropertyCard from '@/components/FeaturedPropertyCard'

import React from 'react'

const FeaturedProperties = () => {
    const fproperties = properties.filter(property => property.is_featured)
    return (
        <>
            {/* <!-- Featured Properties --> */}
            <section className="bg-blue-50 px-4 pt-6 pb-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Featured Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fproperties.map(property => {
                            return (
                                <FeaturedPropertyCard key={property._id} property={property} />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedProperties