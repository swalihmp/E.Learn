import React from 'react'
import NavBar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {
  return (
    <div className="w-full h-screen">
        <div className='absolute top-0 w-full'>
        <NavBar/>
        </div>
        <div className="flex flex-col-reverse lg:flex-row p-5 lg:p-0 w-full h-auto lg:h-4/5 bg-cover font-poppins bg-[url('images/h1_hero.png')]">
            <div className="w-full mt-20 lg:mt-0 pt-5 lg:pt-0 lg:flex-1 flex-col flex place-content-center place-items-center gap-5">
              <h3 className='text-4xl text-white font-semibold w-4/5 lg:w-3/5 leading-snug py-3'>
                Learn more and make success the result of perfection.
              </h3>
              <p className='text-white text-lg w-4/5 lg:w-3/5'>Pick from over 100,000 online video courses with new additions published every month.</p>
              <div className="w-4/5 lg:w-3/5 flex py-2">
                <Link to="/courses" className='bg-red-400 text-white font-semibold py-3 px-8 lg:px-5 lg:py-2 shadow-xl rounded-xl '>Courses</Link>
              </div>
            </div>
            <div className="flex-1 flex place-content-center place-items-center">
              <div className="lg:w-3/6 lg:h-4/5 lg:p-5 mt-32 lg:mt-10">
              </div>
                
            </div>
        </div>

        <div className="w-full flex place-content-center py-10">
          <div className="px-5 flex gap-20 place-items-center">
            <h1 className='font-semibold lg:font-normal text-2xl leading-10 lg:text-4xl font-poppins'>We will help you learn what you are passionates about</h1>
          </div>
        </div>
        <div className="w-full lg:flex place-content-center p-5 gap-3">
          <div className="flex w-full lg:flex-1">
          <div className="w-full h-auto flex gap-3 place-content-center">
            <img className='w-full' src="/homepage_div.png" alt="" />
            </div>
          </div>

          <div className="flex flex-1 text-center lg:text-start flex-col gap-5">
            <div className="flex flex-1 flex-col gap-3  p-5">
              <h3 className='text-xl font-semibold'>Go at your own pace</h3>
              <p className='text-md text-gray-600'>
              You will get your own pace where you can find all the relevant courses for you. Here you can register and learn all the techniques which you want to know.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className='text-xl font-semibold'>Learn from industry experts</h3>
              <p className='text-md text-gray-600'>
              Our industry experts will guide you at each and every point when you are pursuing these courses. Also, if you face any issue during this, they will guide you to call over.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className='text-xl font-semibold'>Find video courses on almost any topic</h3>
              <p className='text-md text-gray-600'>
              You will get the courses related to almost all the topics which you are searching for. Also, you will find the most relevant topics as per your choice.
              </p>
            </div>
          </div>
        </div>
       <Footer/>
    </div>
    
  )
}

export default Home
