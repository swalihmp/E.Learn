import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatecreatecourse } from '../../../redux/createcourseSlice'


export default function CourseformThree() {
   const dispatch = useDispatch()
   const {createcourse} = useSelector(state=>state.createcourse)



  return (
    <div className="flex items-center w-full  rounded-2xl shadow-xl px-4 py-8">
    <form encType="multipart/form-data" className="font-poppins w-full gap-8 flex flex-col place-content-evenly pb-10">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl ppy-2">Welcome Message</label>
            <input type="text" name="welcomemsg" placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,welcomemsg:e.target.value}))}/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_subtitle" className="text-primaryBlue font-semibold text-xl py-2">End Message</label>
            <input type="text" name="endmsg" placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,endmsg:e.target.value}))}/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_description" className="text-primaryBlue font-semibold text-xl py-2">Price</label>
            <input type="text" name="price" placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,price:e.target.value}))}/>
         </div>
         <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_description" className="text-primaryBlue font-semibold text-xl py-2">Sale Price</label>
            <input type="text" name="saleprice" placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={(e)=>dispatch(updatecreatecourse({...createcourse,saleprice:e.target.value}))}/>
         </div>
    </form>
  </div>
  )
}
