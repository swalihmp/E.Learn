import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Toaster,toast } from 'react-hot-toast'
import {AiOutlineCloseCircle} from 'react-icons/ai'



export default function Addsubcategory(props) {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');

  useEffect(()=>{
      getCategory();
  },[])

  async function getCategory() {
      const response = await axios.get(`${BASE_URL}courses/allcategory/`)
      setCategories(response.data)
  }




    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        form.append('name', Name)
        form.append('description', Description)
        form.append('category', category)

    
        const res = await axios({
          method: 'post',
          url: `${BASE_URL}courses/addsubcategory/`,
          data: form
        })
        console.log(res);
        if (res.status === 200) {
          toast.success('Sub Category Added')
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
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Create Sub Category</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around"  encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
                    <div className='w-full flex flex-col place-items-start place-content-center'>
                      <label htmlFor="description" className="text-primaryBlue font-semibold text-lg py-2">Category</label>
                      <select name="session" id="category"  className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setCategory(e.target.value)}>
                          <>
                          <option value="select">Select Category</option>
                          {
                              categories.map((item)=>(
                                  <option value={item.id}  className=' first-letter:uppercase'>{item.name}</option>
                              ))
                          }
                          
                          </>
                      </select>
                    </div>




                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Category Name</label>
                            <input type="text" name="Name" placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label htmlFor="description" className="text-primaryBlue font-semibold text-lg py-2">Category Description</label>
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
