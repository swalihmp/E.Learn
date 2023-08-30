import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart3} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import { getLocal } from '../../helpers/auth'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatecourselist } from '../../redux/courselistSlice';
import { updatesearchdata } from '../../redux/courselistSlice';
import axios from 'axios'
import { BASE_URL } from '../../utils/config'


function NavBar1() {
  const history = useNavigate()
  const dispatch = useDispatch()
  const {searchdata} = useSelector(state=>state.courses)



  const user_auth = getLocal('authToken');
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
    
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    history('/login')
  }


  async function searchCourse(e){
    if(e.key === "Enter"){
      if(!searchdata)
      {
        const response = await axios.get(`${BASE_URL}courses/search/All`)
        dispatch(updatecourselist(response.data))
      }
      else{
        const response = await axios.get(`${BASE_URL}courses/search/${searchdata}`)
        dispatch(updatecourselist(response.data))
      }
      
    }
  }


  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5'>
      <div className="flex flex-1 place-items-center place-content-start gap-12">
          <h1 className='font-semibold text-2xl text-black'>ELearn.</h1>
          <div className="flex px-10 rounded-3xl border-2 border-black py-2 place-items-center ms-3">
            <AiOutlineSearch className='text-black' size={20}></AiOutlineSearch>
            <input type="text" className='focus:outline-none ms-2 bg-transparent placeholder:text-black' placeholder='search for courses' onChange={(e)=>dispatch(updatesearchdata(e.target.value))} onKeyPress={(e)=>{searchCourse(e)}}/>
          </div>
      </div>
      
        <div className='flex gap-3 place-items-center'>
        
            <Link to="/"><li className='px-1 list-none text-black'>Home</li></Link>
            {user_auth ? (
              <Link to="/mylearning"><li className='px-1 list-none text-black'>My Learning</li></Link>
            )
            :
              null
            }
            <Link to="/course"><li className='px-1 list-none text-black'>Courses</li></Link>
            <Link to="/cart"><BsCart3 className="cursor-pointer text-black"></BsCart3></Link>
        </div> 
        {user_auth ? (
          user_name.is_staff ? (
            <Link to="/InstructHome"><li className='px-1 list-none text-black'>Instructor</li></Link>
          ) : (
            <Link to="/Onboard"><li className='px-1 list-none text-black'>Become an Instructor</li></Link>
          )
        ) : null}



        {user_auth ? 
        <div className='flex flex-row'>
              
        <div>
          {/* <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-red-400 mx-2 text-white shadow-xl rounded-xl' onClick={logout} >Logout</button></Link> */}
          <Link to="/profile" className='w-10 h-10 mr-2 rounded-3xl bg-icon flex place-content-center place-items-center cursor-pointer'>
              <h2 className='text-white font-bold text-xl uppercase'>{user_name?.username?.split("")[0]}</h2>
          </Link>
        </div>
        <div className='flex gap-2'>
          <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-red-400 mx-2 text-white shadow-xl rounded-xl' onClick={logout} >Logout</button></Link>

        </div> 
        
        </div>
        : 
        <div>
            <div className='flex gap-2'>
            <Link to="/login"><li className='px-1 list-none'></li><button className='px-4 py-2 bg-red-400 mx-2 text-black shadow-xl rounded-xl' >Login</button></Link>
            </div>   
        </div>
        }
           
    </div>
  )
}

export default NavBar1