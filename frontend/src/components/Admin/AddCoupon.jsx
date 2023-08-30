import React from 'react'
import { Toaster,toast } from 'react-hot-toast'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config'

export default function AddCoupon(props) {
    const [Name, setName] = useState('');
    const [Amount, setAmount] = useState('');
    const [ActiveDate,setActiveDate] = useState('')
    const [ExpDate,setExpDate] = useState('')
    const [Users,setUsers] = useState('')
    const [Discount,setDiscount] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        form.append('name', Name)
        form.append('min_amount', Amount)
        form.append('activ_date', ActiveDate)
        form.append('exp_date', ExpDate)
        form.append('allowed_users', Users)
        form.append('discount', Discount)
    
        const res = await axios({
          method: 'post',
          url: `${BASE_URL}cart/addcoupon/`,
          data: form
        })
        console.log(res);
        if (res.status === 200) {
          toast.success('Coupon Added')
          props.setToggle({add:false})
        } else {
          toast.error(res.statusText)
        }
      }



  return (
    <div className='p-3 absolute z-50'>
        <Toaster position='top-center' limit={3}></Toaster>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full border-2 max-w-lg h-full p-4 mx-auto bg-white rounded-xl shadow-xl">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Create Coupon</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around"  encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Coupon Name</label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Minimum Amount</label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setAmount(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Active Date Amount</label>
                            <input type="date" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setActiveDate(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Exp Date</label>
                            <input type="date" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setExpDate(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Allowed User</label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setUsers(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Discount </label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setDiscount(e.target.value)}/>
                        </div>


                        <div className='py-2 px-3 flex place-content-center rounded-xl w-full'>
                            <button className='bg-cards rounded-lg text-center px-5 py-2 text-white text-light'>Create</button>
                        </div>
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}