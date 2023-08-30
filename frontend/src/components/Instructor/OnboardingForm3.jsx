import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateonboarding } from '../../redux/onboardingSlice'

export default function OnboardingForm3() {
  const dispatch = useDispatch()
  const {onboarding} = useSelector(state=>state.onboarding)


  return (
    <div className='w-4/5 flex flex-col gap-14'>
        <h2 className='text-black font-bold text-3xl w-full leading-10'>Pls Enter the details That shows Your Relevent Qualification</h2>
        <form className='w-full my-5 flex gap-8 flex-col place-content-evenly' >
          <div className='className="flex place-content-start place-items-center border-2 border-black px-3 py-2 '>
            <input type="text" name='subject' className='border-b-2 border-gray-200 focus:border-primary focus:outline-none' placeholder='Specialized Subject' required onChange={(e)=>dispatch(updateonboarding({...onboarding,subject:e.target.value}))}/>
          </div>
          <div className='className="flex place-content-start place-items-center border-2 border-black px-3 py-2 '>
            <input type="text" name='qualification' className='border-b-2 border-gray-200 focus:border-primary  focus:outline-none' placeholder='Heighest Qualification' required onChange={(e)=>dispatch(updateonboarding({...onboarding,qualification:e.target.value}))}/>
          </div>
          <div className='className="flex place-content-start place-items-center border-2 border-black px-3 py-2 '>
            <input type="file" name='certificate' className='border-b-2 border-gray-200 focus:border-primary focus:outline-none'/>
            <label>Upload Document</label>
          </div>


          {/* <div className="flex place-content-end w-full pt-5 pl-10 pr-10">
            <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[15%]'>Submit</button>
          </div> */}




        </form>
    </div>
  )
}
