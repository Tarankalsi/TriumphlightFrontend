import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { phoneNumberAtom } from '../../store/atoms/userAtoms';

const apiUrl = import.meta.env.VITE_URL;

export default function PhoneNumber() {


    const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberAtom)
    const [editDisable, setEditDisable] = useState(true)
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/data`, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('authToken')}`
                    }
                });

                setPhoneNumber(response.data.data.phone_number);
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()


    }, [editDisable === true])

    const onPhoneChange = async (e) => {
        setPhoneNumber(e.target.value)
    }

    const onEditClick = () => {
        setEditDisable(!editDisable)
    }

    const onSavePhone = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${apiUrl}/user/add`, {
                phone_number: phoneNumber
            }, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            })

           
        } catch (error) {
            console.error(error)
        }
        setEditDisable(true)
    }

    return (

        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Mobile Number</h2>
            <div>
                <input disabled={editDisable} type="text" id="phone_number" name="phone_number" value={phoneNumber}
                    onChange={onPhoneChange}
                    className={`${editDisable ? 'bg-gray-300' : ''} mr-2 border-gray-300  border w-[50%] px-6 py-1.5 rounded-lg`}
                />
                {
                    editDisable ?
                        <button onClick={onEditClick} >
                            <FontAwesomeIcon className='size-5 text-gray-600 hover:text-gray-900' icon={faPen} />
                        </button>
                        :
                        <button onClick={onSavePhone} className='bg-green-500 hover:bg-green-600 font-semibold px-3 py-1 text-white rounded-lg'>

                            Save
                        </button>
                }

            </div>
        </div>
    )
}
