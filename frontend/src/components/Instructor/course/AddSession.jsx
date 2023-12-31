import React from 'react'
import { Toaster,toast } from 'react-hot-toast'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/config';
import { useEffect } from 'react';


export default function AddSession(props) {
    console.log(props.SingleCourse)
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [SingleCourse, setSingleCourse] = useState({})

    useEffect(() => {
        getCourse();
    }, [])


    async function getCourse() {
        const response = await axios.get(`${BASE_URL}courses/singlecourse/${props.SingleCourse}`)

        setSingleCourse(response.data)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        form.append('course',props.SingleCourse)
        form.append('title', Title)
        form.append('description', Description)
    
        const res = await axios({
          method: 'post',
          url: `${BASE_URL}csession/addsession/`,
          data: form
        })
        console.log(res);
        if (res.status === 200) {
          toast.success('Session Added')
          props.getCourse()
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
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Add Session</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around"  encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Course</label>
                            <input type="text" readOnly value={SingleCourse.title} name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Session Title</label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label htmlFor="description" className="text-primaryBlue font-semibold text-lg py-2">Session Description</label>
                            <textarea name="description" placeholder="Enter the category description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setDescription(e.target.value)}/>
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
