import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { updatecreatecourse } from '../../../redux/createcourseSlice'


export default function CourseformOne() {

    const dispatch = useDispatch()
    const [Category, setCategory] = useState([])
    const {createcourse} = useSelector(state=>state.createcourse)


    const [subcategories,setSubcategories] = useState([])
    async function getCategory() {
        const response = await axios.get(`${BASE_URL}courses/allcategory/`)
        setCategory(response.data)
    }

    async function getSubcategories(value){
        dispatch(updatecreatecourse({...createcourse,category:value}))
        console.log(value)
        if(value!=='select'){
            const response = await axios.get(`${BASE_URL}courses/subcategory/${value}`)
            setSubcategories(response.data)
        }
        else{
            toast.error("Something went wrong...")
        }
    }

    useEffect(()=>{
        getCategory();
    }, [])



  return (
  <div className="flex items-center w-full  rounded-2xl shadow-xl px-4 py-8">
    <form encType="multipart/form-data" className="font-poppins w-full gap-8 flex flex-col place-content-evenly pb-10">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="title" className="text-primaryBlue font-semibold text-xl ppy-2">Course Title</label>
            <input type="text" name="title" placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,title:e.target.value}))} required/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="subtitle" className="text-primaryBlue font-semibold text-xl py-2">Course Subtitle</label>
            <input type="text" name="subtitle" placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,subtitle:e.target.value}))} required/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="description" className="text-primaryBlue font-semibold text-xl py-2">Course Description</label>
            <textarea name="description" placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,description:e.target.value}))} required/>
         </div>
         <div className="flex w-full place-content-around">
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="category" className="text-primaryBlue font-semibold text-xl py-2">Choose Category</label>
                <select name="category"  placeholder="Select course category" onChange={(e)=>{getSubcategories(e.target.value)}} className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" required>
                        <>
                            <option value="select">Select</option>
                            {
                                Category.map((item)=>(
                                    <option value={item.id}  className=' first-letter:uppercase'>{item.name}</option>
                                ))
                            }
                            
                        </>
                </select>
            </div>
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="subcategory" className="text-primaryBlue font-semibold text-xl py-2">Choose Sub Category</label>
                <select name="subcategory"  placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,subcategory:e.target.value}))}>
                        <>
                            <option value="select">Select</option>
                            {
                                subcategories.map((item)=>(
                                    <option value={item.id}  className=' first-letter:uppercase'>{item.name}</option>
                                ))
                            }
                            
                        </>
                </select>
            </div>
         </div>
    </form>
  </div>
  )
}
