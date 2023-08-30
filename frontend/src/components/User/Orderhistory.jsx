import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar1 from './Navbar1'
import Psidebar from './Psidebar'
import { useState,useEffect } from 'react'
import { BASE_URL } from '../../utils/config'
import axios from 'axios'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Orderhistory() {

    const [orderDetails, setOrderdetails] = useState([])

    useEffect(()=>{
        order_details()
    }, [])


    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
      user_name = jwtDecode(user_auth)
      
    }

    async function order_details() {
        const response = await axios.get(`${BASE_URL}payment/getorders/${user_name.user_id}`)
        setOrderdetails(response.data)
        console.log(response.data)
    }




  return (
    <div className='w-full min-h-screen'>
        <div>
            <NavBar1/>
        </div>
        <div className='w-full h-full flex gap-2'>
            <Psidebar/>
            <div className='px-5 w-full h-full min-h-screen mx-3 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
                <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div class="m-5 pr-3 w-full">
                <div className='w-full'>
                    <h1 className='font-bold text-3xl'>Order History</h1>
                </div>

                <div class="overflow-hidden w-full rounded-lg border mt-12 border-gray-200 shadow-md">
                <table class="w-full border-collapse bg-white text-left text-sm text-black">
                <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-4 font-large text-gray-900">Order Number</th>
                    <th scope="col" class="px-6 py-4 font-large text-gray-900">Date</th>
                    <th scope="col" class="px-6 py-4 font-large text-gray-900">Name</th>
                    <th scope="col" class="px-6 py-4 font-large text-gray-900">Amount</th>
                    <th scope="col" class="px-6 py-4 font-large text-gray-900">Action</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {
                  orderDetails?.map((order,index)=>(
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4">
                            <p>{order.order_id}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>{order.order_date}</p>
                        </td>

                        <td class="px-6 py-4">
                            <p>{order.firtname} {order.lastname}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>{order.order_amount}</p>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex place-content-around gap-5">
                                <Link to={`/invoice/${order.order_payment_id
                                }`} className="flex flex-col place-items-center cursor-pointer">
                                <BsEye size={20}></BsEye>
                                <p className="font-semibold ">View</p>
                                </Link>
                            </div>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
            </div>

            </div>
        </div>
    </div>
  )
}
