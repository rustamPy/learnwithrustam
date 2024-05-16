import React from 'react'
import properties from '@/components/properties.json'
import PropertyCard from '@/components/PropertyCard'

const PropertyPage = () => {
    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map(prop => {
                            return (
                                <PropertyCard key={prop._id} property={prop} />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyPage;