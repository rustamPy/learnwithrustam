import React from 'react'

import Image from 'next/image';
import Link from 'next/link';
interface PropertyProps {
    property: object
}

import { FaBed, FaBath, FaMoneyBill, FaMapMarked, FaRulerCombined } from 'react-icons/fa';


export const getRate = (prop: object) => {
    let rate = '';
    prop.rates.monthly !== undefined ? rate = `${prop.rates.monthly}/mo` :
        prop.rates.weekly !== undefined ? rate = `${prop.rates.weekly}/wk` :
            prop.rates.nightly !== undefined ? rate = `${prop.rates.nightly}/night` : null
    return rate;
}

const PropertyCard: React.FC<PropertyProps> = ({ property }) => {


    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={`/images/properties/${property.images[0]}`}
                width={0}
                height={0}
                sizes={'100vw'}
                alt=""
                className='w-full h-auto rounded-t-xl'
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{property.type}</div>
                    <h3 className="text-xl font-bold">{property.name}</h3>
                </div>

                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    ${getRate(property)}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                        <FaBed className='inline mr-2' />{property.beds}
                        <span className="md:hidden lg:inline"> Bed{property.beds > 1 ? 's' : ''}</span>
                    </p>
                    <p>
                        <FaBath className='inline mr-2' />{property.baths}
                        <span className="md:hidden lg:inline"> Bath{property.baths > 1 ? 's' : ''}</span>
                    </p>
                    <p>
                        <FaRulerCombined className='inline mr-2' />
                        {property.square_feet} <span className="md:hidden lg:inline">sqft</span>
                    </p>
                </div>

                <div
                    className="flex justify-center gap-4 text-green-900 text-sm mb-4"
                >
                    {Object.keys(property.rates).map((rate, i) => {
                        return (
                            <p key={i}><FaMoneyBill className='inline' /> {rate}</p>
                        )
                    })}
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">

                        <span className="text-orange-700"> <FaMapMarked className='inline mb-1' /> {' '}{property.location.city} </span>
                    </div>
                    <Link
                        href={`/properties/${property._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard;