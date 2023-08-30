import React from 'react'
import CourseFormOne from '../../Instructor/course/CourseformOne'
import CourseFormTwo from '../../Instructor/course/CourseformTwo'
import CourseFormThree from '../../Instructor/course/CourseformThree'
import { Toaster, toast} from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import Sidebar1 from '../Sidebar1'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../../utils/config'
import jwtDecode from "jwt-decode"
import { getLocal } from '../../../helpers/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function CreateCourse() {
    const [activeStep,setActiveStep] = useState(0);
    const {createcourse} = useSelector(state=>state.createcourse)
    const user_auth = getLocal('authToken');
    const history = useNavigate()


    function handleBack(){
        setActiveStep((prev)=>prev-1)
    }
   function handleNext(){
        setActiveStep((prev)=>prev+1)
    }

    let user_name;
    if(user_auth){
      user_name = jwtDecode(user_auth)
      
    }


    const formContent = (step)=>{
        switch(step){
            case 0:
                return <CourseFormOne />
            case 1:
                return <CourseFormTwo />
            case 2:
                return <CourseFormThree />
            default:
                return <Navigate to="/instructor/dashboard"/>
        }
    }

    const Submitdata = async (e) => {
      e.preventDefault()
  
      const form = new FormData()
      form.append('user',user_name.user_id)
      form.append('title', createcourse.title)
      form.append('subtitle', createcourse.subtitle)
      form.append('description', createcourse.description,)
      form.append('category',createcourse.category)
      form.append('sub_category',createcourse.subcategory)
      form.append('image',createcourse.image)
      form.append('video',createcourse.promovideo)
      form.append('welcomemsg',createcourse.welcomemsg)
      form.append('endmsg',createcourse.endmsg)
      form.append('price',createcourse.price)
      form.append('saleprice',createcourse.saleprice)

      const res = await axios({
        method: 'post',
        url: `${BASE_URL}courses/createcourse/`,
        data: form
      })
      console.log(res);
      if (res.status === 200) {
        history('/InstructorCourse',{state:{msg:"Course Created"}})
        
      } else {
        toast.success("Somthing Wrong")
      }
    }


  return (
    <div className='flex w-full h-auto'>
        <Sidebar1/>
        <div className="w-full h-auto flex flex-col place-content-center shadow-xl rounded-md m-5">
            <Toaster position='top-center' limit={3}></Toaster>
            <div className='w-full h-auto flex flex-col place-content-start place-items-start px-20'>
                {formContent(activeStep)}
            </div>
            <div className='w-full py-4 flex place-content-center px-20'>
                    <div className={activeStep>0 ? "flex place-content-between w-full" : "flex place-content-end w-full"}>
                        {activeStep>0 ? 
                            <button className='bg-cards rounded-xl px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleBack} >Back</button>
                            : null
                        }

                        {activeStep!==2 ? <button className='bg-cards rounded-xl px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleNext} >Next</button>
                       
                        :
                        <button type='button' className='bg-cards rounded-xl px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={Submitdata}>Submit</button>
                        }
                        
                    </div>
                       
            </div>
        </div>
        
    </div>
  )
}
