import React, { useState } from 'react'
import { ConfirmationModal } from '../../general/ConfirmationModal'
import axios from 'axios';
import SuccessModal from '../../general/SuccessModal';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_URL;

export default function TableRow({ product }) {
    const navigate = useNavigate()
    const [successModel, setSuccessModal] = useState(false)

    const editAction = () => {

        navigate(`./edit-product/${product.product_id}`)
    };


    const successModalClosed = () => {
        window.location.reload()
        setSuccessModal(false)
    }
    const deleteAction = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/product/delete/${product.product_id}`, {
                headers: {
                  'Authorization': `Bearer ${Cookies.get('adminToken')}`
                }
              });

            if (response.data.success) {
                setSuccessModal(true)
            }


        } catch (error) {
                console.error("Error while deleting product", error)
        }
    };


    return (
        <>
        <SuccessModal isOpen={successModel} onClose={successModalClosed}/>
        
            <tr className="border-b border-gray-200">
            
                <td className='cursor-pointer' onClick={
                    ()=>{
                        navigate(`/admin/product/${product.product_id}`)
                    }
                }><td className="px-6 py-4 whitespace-nowrap hover:text-blue-700">{product.name}</td></td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.availability}</td>
                <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                    <ConfirmationModal requestAction={editAction} label={"Edit"} color={"green"} />
                    <ConfirmationModal requestAction={deleteAction} label={"Delete"} color={"rose"} />

                </td>
            </tr>
        </>

    )
}
