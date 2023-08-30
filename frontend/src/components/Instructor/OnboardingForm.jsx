import React from 'react'
import { useState } from 'react'
import { Link, Navigate , useNavigate } from 'react-router-dom'
import OnboardingForm1 from './OnboardingForm1'
import OnboardingForm2 from './OnboardingForm2'
import OnboardingForm3 from './OnboardingForm3'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../utils/config'
import jwtDecode from "jwt-decode"
import { getLocal } from '../../helpers/auth'


function OnboardingForm() {

  const {onboarding} = useSelector(state=>state.onboarding)
  const [activeStep,setActiveStep] = useState(1);
  const user_auth = getLocal('authToken');
  const history = useNavigate()

  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
    
  }

  function handleBack(){
    setActiveStep((prev)=>prev-1)
  }
  function handleNext(){
    console.log(user_name)
    setActiveStep((prev)=>prev+1)
  }
  const formContent = (step)=>{
      switch(step){
          case 1:
              return <OnboardingForm1/>;
          case 2 :
              return <OnboardingForm2/>;
          case 3 :
              return <OnboardingForm3/>;
          default:
              return <Navigate to="/"/>
      }
  }


  const Submitdata = async (e) => {
    e.preventDefault()

    const response = await fetch(`${BASE_URL}instruct/onboard/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expmode: onboarding.experience_mode,
        exptype: onboarding.experience_type,
        subject: onboarding.subject,
        qualification: onboarding.qualification,
        user : user_name.user_id, 
      })
    })
    
    if (response.status === 200) {
      localStorage.removeItem('authToken')
      history('/login',{state:{msg:"Pls Login to Access the Instructor dashboard"}})
      
    } else {
      console.log("Something went wrong")
    }

  }

  return (
    <div className=" w-full h-screen flex">
      <div className="flex flex-1 place-content-center bg-bgc place-items-center">
        <img src="/Instructor.jpg" alt="" />
      </div>
      <div className="flex flex-col flex-1 place-content-center place-items-center pr-5 pl-5">
        <div className="absolute flex justify-end items-center top-4 right-4">
          <Link to="/">Cancel</Link>
        </div>

        {formContent(activeStep)}
          <div className='w-full flex place-content-center'>
            <div className={activeStep>1 ? "flex place-content-between w-full pt-5 pl-10 pr-10" : "flex place-content-end w-full pt-5 pl-10 pr-10"}>
              {activeStep>1 ? 
                <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[15%] rounded-xl' onClick={handleBack}>Back</button>
              : null
              }

              {activeStep!==3 ?
                <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[15%] rounded-xl' onClick={handleNext}>Next</button>
              :
                <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[15%] rounded-xl' onClick={Submitdata}>Submit</button>
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default OnboardingForm