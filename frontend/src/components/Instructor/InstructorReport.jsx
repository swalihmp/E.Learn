import React from 'react'
import Sidebar from './Sidebar'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'

export default function InstructorReport() {
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        
        getOrders();
    }, [])

    const user_auth = getLocal('authToken');
    let user_name;
    if(user_auth){
      user_name = jwtDecode(user_auth)
      
    }

    async function getOrders() {
        const response = await axios.get(`${BASE_URL}payment/Iorders/${user_name.user_id}`)
        setOrders(response.data)
    }




  return (
<div className='flex h-full bg-acontent'>
            
            <Sidebar/>
            <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className="w-full px-5 flex place-items-center ">
            <div className='flex place-content-start place-items-center w-full h-14'>
                <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Sales Report</h2>
            </div>
            </div>
            

            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
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
                  orders?.map((order,index)=>(
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
  )
}
