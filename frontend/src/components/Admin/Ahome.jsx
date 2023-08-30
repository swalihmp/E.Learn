import React from 'react'
import Sidebar from './Sidebar'
import { Toaster } from 'react-hot-toast'
import { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';



export default function Ahome() {

  const [Courses, setCourses] = useState([])
  const [Instructor, setInstructor] = useState([])
  const [student, setStudent] = useState([])
  const [Order,setOrder] = useState([])
  const [total,setTotal] = useState('')
  const [maptotal,setmaptotal] = useState([])
  

        

    async function getDatas() {
        const response = await axios.get(`${BASE_URL}courses/allcourse/`)
        const instructor = await axios.get(`${BASE_URL}instruct/instructors/`)
        const students = await axios.get(`${BASE_URL}api/users/`)
        const response1 = await axios.get(`${BASE_URL}payment/allorders/`)

        setOrder(response1.data)
        setCourses(response.data)
        setInstructor(instructor.data)
        setStudent(students.data)

        const total = response1.data.reduce((acc,curr) => {
          acc = acc + parseInt(curr.order_amount)
          return acc
        },0);

        setTotal(total)

        const TotalsArray = response1.data.map(item => item.order_amount);
        setmaptotal(TotalsArray)

    }

    useEffect(()=>{
        getDatas();
    }, [])

  const [chartData, setChartData] = useState({
    series: [{
        data: [700,799,1999,1400,2599]
    }],
    options: {
      chart: {
          height: 350,
          type: 'bar',
          events: {
              click: function (chart, w, e) {
                  // console.log(chart, w, e)
              }
          }
      },
      //   colors: colors,
      plotOptions: {
          bar: {
              columnWidth: '45%',
              distributed: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      legend: {
          show: false
      },
      xaxis: {
        categories: [
          ['20-05-2023'],
          ['21-05-2023'],
          ['22-05-2023'],
          ['23-05-2023'],
          ['24-05-2023'],
          ['25-05-2023'],
          ['26-05-2023'],

        ],
        labels: {
          style: {
              // colors: colors,
              fontSize: '12px'
          }
        }
      }
    }
  });

  const [chartData1, setChartData1] = useState({
    series: [{
        data: [600,699,1799,1300,2399]
    }],
    options: {
      chart: {
          height: 350,
          type: 'bar',
          events: {
              click: function (chart, w, e) {
                  // console.log(chart, w, e)
              }
          }
      },
      //   colors: colors,
      plotOptions: {
          bar: {
              columnWidth: '45%',
              distributed: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      legend: {
          show: false
      },
      xaxis: {
        categories: [
            ['20-05-2023'],
            ['21-05-2023'],
            ['22-05-2023'],
            ['23-05-2023'],
            ['24-05-2023'],
            ['25-05-2023'],
            ['26-05-2023'],

        ],
        labels: {
          style: {
              // colors: colors,
              fontSize: '12px'
          }
        }
      }
    }
  });

  return (
    <div className='flex bg-acontent'>
        <Sidebar/>
        <div className='px-5 w-full h-full min-h-screen mx-5 mt-2  py-5 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
          <div className=" h-20 w-full flex place-content-start place-items-center px-5">
              <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Dashboard</h3>
          </div>
          <div class="overflow-hidden  m-5 w-full">
          <Toaster position='top-center' reverseOrder='false' ></Toaster>
            <div className="w-full h-uto flex place-items-center place-content-between gap-3">
              <div className="bg-cards w-3/6 h-35 shadow-xl p-5 m-3 rounded-xl flex flex-col">
                 <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-white font-semibold text-center text-xl'>Total Courses</h3>
                  <h4 className='font-semibold text-white text-2xl text-center'>{Courses.length}</h4>
                 </div>
              </div>
              <div className="bg-cards w-3/6 h-35 shadow-xl rounded-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-white font-semibold text-center text-xl'>Instructors</h3>
                  <h4 className='font-semibold text-white text-2xl text-center'>{Instructor.length}</h4>
                 </div>
              </div>
              <div className="bg-cards w-3/6 h-35 shadow-xl rounded-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-white font-semibold text-center text-xl'>Total Students</h3>
                  <h4 className='font-semibold text-white text-2xl text-center'>{student.length}</h4>
                 </div>
              </div>
              <div className="bg-cards w-3/6 h-35 rounded-xl  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-white font-semibold text-center text-2xl'>Total Revenue</h3>
                  <h4 className='font-semibold text-white text-2xl text-center'>{total}</h4>
                 </div>
              </div>
              <div className="bg-cards w-3/6 h-35 rounded-2xl  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h3 className='text-white font-semibold text-center text-2xl'>Total Sales</h3>
                  <h4 className='font-semibold text-white text-2xl text-center'>{total}</h4>
                 </div>
              </div>
            </div>


            <div className="w-full flex place-content-between pb-10 pt-10">
                <div className="w-full h-full mt-10">
                    <h3 className=' font-bold'>Before Payout</h3>
                    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={290} />
                </div>

                <div className="w-full h-full mt-10">
                    <h3 className=' font-bold'>After Payout</h3>
                    <ReactApexChart options={chartData1.options} series={chartData1.series} type="bar" height={290} />
                </div>
            </div>

            {/* <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
              <tr>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Course Name</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Category</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Instructor</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Lessons</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Amount</th>
              </tr>
              </thead>
              
              </table>
            </div> */}

          </div>
        </div>
    </div>
  )
}
