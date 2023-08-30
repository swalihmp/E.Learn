import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsBook} from 'react-icons/bs'
import {CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export default function Sidebar1() {
    const navigate = useNavigate()

    const gotoHome = () => {
        navigate('/')
    }

  return (
    <div className='bg-white z-50 absolute h-auto min-h-screen xl:relative left-0 w-2/4 md:w-2/6 lg:w-1/5 shadow-xl  font-poppins rounded-r-2xl '>
        <div className="flex py-3">
            <img src="/avatar.png" alt="admin_profile_image" className='rounded-xl w-30 h-30' />
            <div className="flex flex-col place-content-center place-items-start">
                <h2 className='font-semibold'>Swalih Mp</h2>
                <p className='text-black font-semibold'>Instructor</p>
            </div>
        </div>
        <div className="flex flex-col px-3 py-5 mt-5">
            <NavLink to="/InstructHome" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            <NavLink to="/InstructorCourse" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
            <BsBook size={50} className='px-3'></BsBook>
                <h3 className='font-semibold'>Courses</h3>
            </NavLink>

            <NavLink to="/Instructor" className={({isActive})=>(isActive ? 'bg-cards rounded-xl flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold'>Sales Report</h3>
            </NavLink>

            <div className="flex place-items-center h-10 my-2 cursor-pointer" onClick={()=>{gotoHome()}}>
                <CiLogout size={50} className='px-3 text-primaryBlue'></CiLogout>
                <h3 className='font-semibold text-primaryBlue'>Home</h3>
            </div>

        </div>
    </div>
  )
}
