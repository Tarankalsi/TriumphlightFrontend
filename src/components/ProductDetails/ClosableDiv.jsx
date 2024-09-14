import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ClosableDiv({ children, label }) {
    const [openDescription, setOpenDescription] = useState(true)
    return (
        <div className='border-b border-gray-400'>
            <div className="flex justify-between items-center  px-4  py-3">
                <div className={`${openDescription ? "font-semibold" : "font-medium"} text-lg tracking-wider`}>{label}</div>
                <button
                    onClick={() => {
                        if (openDescription === false) {
                            setOpenDescription(true)
                        } else {
                            setOpenDescription(false)
                        }
                    }}
                >
                    {openDescription ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                </button>
            </div> <div className='text-sm '>
                {openDescription && children}
            </div>

        </div>
    )
}
