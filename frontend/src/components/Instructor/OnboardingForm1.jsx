import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateonboarding } from '../../redux/onboardingSlice'

export default function OnboardingForm1() {
    const dispatch = useDispatch()
    const {onboarding} = useSelector(state=>state.onboarding)


  return (
    <div className='w-4/5 flex flex-col gap-14'>
        <h2 className='text-black font-bold text-3xl w-full leading-10'>What kind of teaching have you done before ?</h2>
        <form className='w-full my-5 flex gap-8 flex-col place-content-evenly'>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='online' className='p-2 cursor-pointer' defaultValue={onboarding.experience_mode} value="online" onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_mode:e.target.value}))}  />
                <label htmlFor="online" id='online' className='text-xl font-semibold text-black px-3 cursor-pointer'>Online</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='offline' className='p-2 cursor-pointer' defaultValue={onboarding.experience_mode} value="offline" onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_mode:e.target.value}))} />
                <label htmlFor="offline" id='offline' className='text-xl font-semibold text-black px-3 cursor-pointer'>Offline</label>
            </div>
            <div className="flex place-content-start place-items-center border-2 border-black px-3 py-2">
                <input type="radio" name="experience_mode" id='both' className='p-2 cursor-pointer' defaultValue={onboarding.experience_mode} value="both" onChange={(e)=>dispatch(updateonboarding({...onboarding,experience_mode:e.target.value}))}/>
                <label htmlFor="both" id='both' className='text-xl font-semibold text-black px-3 cursor-pointer'>Both</label>
            </div>
        </form>
    </div>
  )
}
