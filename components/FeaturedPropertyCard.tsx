import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getRate } from '@/components//PropertyCard';
import { FaBed, FaBath, FaMoneyBill, FaMapMarked, FaRulerCombined } from 'react-icons/fa';


const FeaturedPropertyCard: React.FC<({ property: object })> = ({ property }) => {
    return (
        <>
            <div
                className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
            >
                <Image
                    src={`/images/properties/${property.images[0]}`}
                    alt=""
                    width={0}
                    height={0}
                    sizes='100vw'
                    className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
                />
                <div className="p-6">
                    <h3 className="tw-text-xl font-bold">{property.name}</h3>
                    <div className="tw-text-gray-600 mb-4">{property.type}</div>
                    <h3
                        className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg tw-text-blue-500 font-bold tw-text-right md:tw-text-center lg:tw-text-right"
                    >
                        ${getRate(property)}
                    </h3>
                    <div className="flex justify-center gap-4 tw-text-gray-500 mb-4">
                        <p>
                            <FaBed className='inline mr-2' />{property.beds}
                            <span className="md:hidden lg:inline">Beds</span>
                        </p>
                        <p>
                            <FaBath className='inline mr-2' />{property.baths}
                            <span className="md:hidden lg:inline">Baths</span>
                        </p>
                        <p>
                            <FaRulerCombined className='inline mr-2' />
                            {property.square_feet} <span className="md:hidden lg:inline">sqft</span>
                        </p>
                    </div>

                    <div
                        className="flex justify-center gap-4 tw-text-green-900 tw-text-sm mb-4"
                    >
                        {Object.keys(property.rates).map((rate, i) => {
                            return (
                                <p key={i}><FaMoneyBill className='inline' /> {rate}</p>
                            )
                        })}
                    </div>

                    <div className="border border-gray-200 mb-5"></div>

                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                            <i
                                className="fa-solid fa-location-dot tw-text-lg tw-text-orange-700"
                            ></i>
                            <span className="tw-text-orange-700"> <FaMapMarked className='inline mb-1' /> {' '} {property.location.city} </span>
                        </div>
                        <Link
                            href={`/properties/${property._id}`}
                            className="h-[36px] bg-blue-500 hover:bg-blue-600 tw-text-white px-4 py-2 rounded-lg tw-text-center tw-text-sm"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedPropertyCard