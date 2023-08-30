import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateonboarding } from '../../redux/onboardingSlice'

export default function OnboardingForm2() {
    const dispatch = useDispatch()
    const {onboarding} = useSelector(state=>state.onboarding)


  return (
    <div className='w-4/5 flex flex-col gap-14'>
        <h2 className='text-black font-bold text-3xl w-full leading-10'>How many Years of Experiance you have in teaching ?</h2>
        <form className='w-full my-5 flex gap-8 flex-col place-content-evenly' >
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_type" id='online' value="Fresher" className='p-2 cursor-pointer' onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_type:e.target.value}))} />
                <label htmlFor="online" id='online' className='text-xl font-semibold text-black px-3 cursor-pointer'>Am a Fresher</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_type" id='offline' value="1+" className='p-2 cursor-pointer' onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_type:e.target.value}))} />
                <label htmlFor="offline" id='offline' className='text-xl font-semibold text-black px-3 cursor-pointer'>More than 1 Year</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_type" id='both' value="5+" className='p-2 cursor-pointer' onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_type:e.target.value}))}/>
                <label htmlFor="both" id='both' className='text-xl font-semibold text-black px-3 cursor-pointer'>More than 5 Year</label>
            </div>
        </form>
    </div>
  )
}
