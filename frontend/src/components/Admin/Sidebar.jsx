import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiHomeAlt2,BiCategoryAlt,BiCategory} from 'react-icons/bi'
import {BsBook} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {SlGraduation} from 'react-icons/sl'
import {CiDiscount1,CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const history = useNavigate()

    const adminLogout = () => {
        localStorage.removeItem('authToken')
        history('/')
    }

  return (
    <div className='bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-2/6 lg:w-1/5 shadow-xl  font-poppins rounded-r-2xl '>
        <div className="flex py-3">
            <img src="/avatar.png" alt="admin_profile_image" className='rounded-xl w-30 h-30' />
            <div className="flex flex-col place-content-center place-items-start">
                <h2 className='font-semibold'>Swalih Mp</h2>
                <p className='text-black font-semibold'>Admin</p>
            </div>
        </div>
        <div className="flex flex-col px-3 py-5 mt-5">
            <NavLink to="/ahome" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            <NavLink to="/acourses" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
            <BsBook size={50} className='px-3'></BsBook>
                <h3 className='font-semibold'>Courses</h3>
            </NavLink>
            <NavLink to="/students" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <AiOutlineUser size={50} className='px-3 '></AiOutlineUser>
                <h3 className='font-semibold '>Students</h3>
            </NavLink>
            <NavLink to="/Admininstructor" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <SlGraduation size={50} className='px-3'></SlGraduation>
                <h3 className='font-semibold'>Instructors</h3>
            </NavLink>


            <NavLink to='/coupon' className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <CiDiscount1  size={50} className='px-3 text-primaryBlue'></CiDiscount1>
                <h3 className='font-semibold text-primaryBlue'>Coupon</h3>
            </NavLink>
           
            <NavLink to="/acategory" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategoryAlt size={50} className='px-3'></BiCategoryAlt>
                <h3 className='font-semibold'>Categories</h3>
            </NavLink>
            <NavLink to="/subcategory" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategory size={50} className='px-3'></BiCategory>
                <h3 className='font-semibold'>Sub Categories</h3>
            </NavLink>
            <NavLink to="/salesreport" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold'>Sales Report</h3>
            </NavLink>

            <div className="flex place-items-center h-10 my-2 cursor-pointer" onClick={()=>{adminLogout()}}>
                <CiLogout size={50} className='px-3 text-primaryBlue'></CiLogout>
                <h3 className='font-semibold text-primaryBlue'>Logout</h3>
            </div>

        </div>
    </div>
  )
}
