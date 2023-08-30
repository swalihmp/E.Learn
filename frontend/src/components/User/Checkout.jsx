import React from 'react'
import NavBar from './Navbar'
import { useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth'
import { BASE_URL } from '../../utils/config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';


export default function Checkout() {

  const navigate = useNavigate()
  const [Cart, setCart] = useState([])
  const [total, setTotal] = useState('')
  const [before, setBefor] = useState('')
  const [coupon, setCoupon] = useState('')
  const [appliedcoupon, setApplied] = useState('Nill')
  const [discount, setDiscount] = useState('0.00')


  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
    
  const user_auth = getLocal('authToken');
  let user_name;
  if(user_auth){
    user_name = jwtDecode(user_auth)
  }

  const clearCoupon = async () =>{
    setApplied('Nill')
    setDiscount('0.00')
    setTotal(before)
  }

  const applyCoupon = async () =>{
    if (coupon===''){
      toast.error('pls enter coupon code')
    }
    else{
      console.log(coupon)
      const res = await axios({
        method: 'post',
        url: `${BASE_URL}cart/applycoupon/`,
        data: {coupon,total}
      })
      console.log(res);
      if (res.data.status === 'success') {
        console.log(res.data)
        setDiscount(res.data.discount)
        setTotal(res.data.g_total)
        setApplied(res.data.coupon_name)
        toast.success('Coupon Applied')
      } else if (res.data.msg === 600) {

        toast.error("Invalid coupon")
      }
      else {
        toast.error("Total Amount goes to Minimum")
      }
    }
    
  }




  useEffect(() => {
      getCart();
  }, [])



  async function getCart() {
      const cart_response = await axios.get(`${BASE_URL}cart/getcarts/${user_name.user_id}`)
      setCart(cart_response.data.data)
      setTotal(cart_response.data.total)
      setBefor(cart_response.data.total)
  }

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("user",user_name.user_id)

      await axios({
        url: `${BASE_URL}payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          console.log(res.data.order_id)
          navigate(`/invoice/${res.data.order_id}`)
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    if (!fname || !lname || !address1 || !address2 || !email || !phone)
    {
      toast.error("pls fill all data")
    }
    else{


    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data

    bodyData.append("amount", total);
    bodyData.append("user", user_name.user_id);
    bodyData.append("fname",fname)
    bodyData.append("lname",lname)
    bodyData.append("address1",address1)
    bodyData.append("address2",address2)
    bodyData.append("email",email)
    bodyData.append("phone",phone)
    bodyData.append("coupon",appliedcoupon)
    bodyData.append("discount",discount)
    // bodyData.append("appliedcoupon",appliedcoupon)

    const data = await axios({
      url: `${BASE_URL}payment/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    const REACT_APP_PUBLIC_KEY = 'rzp_test_GrC2fomAR5BvCu'
    const REACT_APP_SECRET_KEY = 'K3oUpvscgHYIteoxLW3u0Quf'
    
    var options = {
      key_id: REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "E.Learn",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  };



  return (
    <div className='w-full h-full font-poppins relative'>
        <Toaster position='top-center' reverseOrder='false' ></Toaster>
        <div className="w-full h-80 bg-cover bg-[url('images/h1_hero.png')]">
            <NavBar/>
            <div className="w-full py-10 mt-10  flex flex-col place-content-center place-items-center">
                <div className="w-4/5">
                    <h2 className='text-4xl font-semibold text-white '>Checkout</h2>
                </div>
            </div>
        </div>
        <div className="w-full pl-5 pr-5 absolute top-60 py-5 px-2 flex place-content-between place-items-center gap-10">
          <div className="w-4/6 flex flex-col ml-16 gap-8 pr-8 px-3">
            <div className="flex items-center bg-white w-full  rounded-2xl shadow-xl px-4 py-8">
                <form encType="multipart/form-data" className="font-poppins w-full gap-8 flex flex-col place-content-evenly place-items-center pb-10">
                  <div className='flex w-3/4 py-3 justify-between'>
                    <div className="flex  flex-col w-3/6 px-1">
                        <label htmlFor="first_name" className='py-3'>First Name</label>
                        <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setFname(e.target.value)} placeholder='Enter First Name'/>
                        
                    </div>
                    <div className="flex flex-col w-3/6 px-1">
                        <label htmlFor="last_name" className='py-3'>Last Name</label>
                        <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setLname(e.target.value)} placeholder='Enter Last Name'/>
                    </div>
                
                  </div>
                  <div className='flex w-3/4 py-3 justify-between'>
                    <div className="flex  flex-col w-3/6 px-1">
                        <label htmlFor="first_name" className='py-3'>Address Line 1</label>
                        <input type="address1" name='address1' onChange={e => setAddress1(e.target.value)} className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Address 1'/>
                        
                    </div>
                    <div className="flex flex-col w-3/6 px-1">
                        <label htmlFor="last_name" className='py-3'>Address Line 2</label>
                        <input type="address2" name='address2' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setAddress2(e.target.value)} placeholder='Enter Address 2'/>
                    </div>
                
                  </div>
                  <div className='flex w-3/4 py-3 justify-between'>
                    <div className="flex  flex-col w-3/6 px-1">
                        <label htmlFor="first_name" className='py-3'>Email Address</label>
                        <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setEmail(e.target.value)} placeholder='Enter Email Address'/>
                        
                    </div>
                    <div className="flex flex-col w-3/6 px-1">
                        <label htmlFor="last_name" className='py-3'>Phone Number</label>
                        <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' onChange={e => setPhone(e.target.value)} placeholder='Enter Phone Number'/>
                    </div>
                
                  </div>
                </form>
            </div>

          </div>
            <div className="w-1/5 p-5 rounded-xl  top-0 mr-6 pb-10 mt-5 right-14 absolute bg-white flex flex-col gap-5 shadow-xl">
                <h1 className='text-md font-semibold font-poppins'>Cart Total</h1>
                {
                    Cart?.map((item)=>(
                        <div className='w-full flex place-content-between border-b-2 border-gray-200 gap-3 py-1'>
                            <p className='w-3/5 text-sm'>{item.course.title}</p>
                            <p>₹ {item.price}</p>
                        </div>
                    ))
                }

                <div className="w-full flex flex-col gap-3 place-content-center">
                    <div className="flex flex-col gap-2">
                      <input type='text' className='border-black-100 h-8 pl-2 border-2 rounded-lg border-black' name='coupon' placeholder='  Do you have a coupon ?' onChange={e => setCoupon(e.target.value)}/>
                    </div>
                    <div className="w-full">
                      {appliedcoupon!=='Nill'?
                       <button onClick={clearCoupon} className='text-sm  text-blue-600'>Clear Coupon</button>
                       :
                       <button onClick={applyCoupon} className='text-sm  text-blue-600'>Apply Coupon</button>

                      }
                        
                    </div>
                  </div>
            

                <div className='w-full flex gap-2 place-content-between'>
                    <p className='text-md  '>Coupon : </p>
                    <p className='font-semibold'>{appliedcoupon}</p>
                </div>

                <div className='w-full flex gap-2 place-content-between'>
                    <p className='text-md '>Discount : </p>
                    <p className='font-semibold'>{discount}</p>
                </div>

                <div className='w-full flex gap-2 place-content-between'>
                    <p className='text-xl font-semibold '>Sub Total : </p>
                    <p className='font-semibold'>₹ {total}</p>
                </div>
                

                <Link className=' h-11 rounded-xl place-items-center bg-cards text-center text-white font-semibold'><button onClick={showRazorpay} className='bg-darkPink px-3 py-2 text-white font-semibold'>Payout</button></Link>
            </div>
            
             
        </div>
            
        
    </div>
  )
}
