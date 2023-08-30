import React from 'react'
import { Toaster,toast } from 'react-hot-toast'
import Sidebar from './Sidebar'
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import { useEffect,useState } from 'react'
import AddCoupon from './AddCoupon'
import {MdDeleteOutline} from 'react-icons/md'
import Swal from 'sweetalert2'

export default function Coupon() {
  const [Coupon, setCoupon] = useState([])
  const [toggle,setToggle] = useState({add:false,edit:false});


  useEffect(() => {
    getCoupon();
  }, [])
  
  async function getCoupon() {
    const response = await axios.get(`${BASE_URL}cart/getcoupon/`)
    console.log(response.data)
    setCoupon(response.data)
  }


  const DeleteCategory = (id) => {

    Swal.fire({
        title: 'Are you sure?',
        text: "Delete Coupon....!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios.get(`${BASE_URL}cart/deletecoupon/${id}`).then(
              getCoupon()
            )
            getCoupon()
            toast.error("Deleted")
        }
    })
}

  return (
    <div className='flex bg-acontent'>
    <Sidebar/>
    <div className='px-5 w-full h-full min-h-screen mx-5 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
      <div className=" h-20 w-full flex place-content-between place-items-center px-5">
          <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Coupon Management</h3>
          <button className='bg-cards rounded-lg text-center px-5 py-2 text-white text-light' onClick={()=>setToggle({add:true})}>New Coupon</button>
      </div>
      <div class="overflow-hidden  m-5 w-full">
      <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full h-uto flex place-items-center  gap-3">
        {
                                    
          Coupon?.map((coupon,index)=>(
            <div className="shadow-xl bg-light-blue-300 rounded-xl place-content-between h-120 px-1 mr-8 py-8 w-80 flex-col flex gap-8">
                <div className="flex flex-col">
                    <div className='w-full flex justify-end'>
                      <MdDeleteOutline onClick={() => DeleteCategory(coupon.id)} size={25} className='text-black text-right' ></MdDeleteOutline>
                    </div>
                    <p className='text-xl font-bold text-center text-white'>{coupon?.name}</p>
                    <p className='text-md font-bold text-center text-white'>{coupon?.activ_date} to {coupon.exp_date} </p>
                    <p className='text-md font-bold text-center text-white'>{coupon.allowed_users} Remaining</p>
                    <p className='text-md font-bold text-center text-white'>Discount: {coupon.discount}/- </p>
                </div>

            </div>
          ))}
        </div>

      </div>
      {
        toggle.add ? <AddCoupon setToggle={setToggle}/> : null
      }
    </div>
</div>
  )
}
