import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { Toaster,toast } from 'react-hot-toast';
import {AiOutlineCloseCircle} from 'react-icons/ai'



export default function Editcategory({toggle,setToggle}) {
    const [singleCategory, setSingleCategory] = useState({});
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Image, setImage] = useState(null);


    useEffect(() => {
      getCategory();
    }, [])

    async function getCategory() {
      const response = await axios.get(`${BASE_URL}courses/singlecat/${toggle.edit}`)
      console.log(response.data)
      setSingleCategory(response.data)
      setName(response.data.name)
      setDescription(response.data.description)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const form = new FormData()
        
        form.append('name', Name)
        form.append('description', Description)
        form.append('image', Image)
    
        const res = await axios({
          method: 'put',
          url: `${BASE_URL}courses/singlecat/${toggle.edit}`,
          data: form
        })
        console.log(res);
        if (res.status === 200) {
          toast.success('Success')
          setToggle({add:false})
        } else {
          toast.error(res.statusText)
        }
      }

  return (
    <div className='p-3 absolute z-50'>
        <Toaster position='top-center' limit={3}></Toaster>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full border-2 max-w-lg h-full p-4 mx-auto bg-white rounded-xl shadow-xl">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Edit Category</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around"  encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="Name" className="text-primaryBlue font-semibold text-lg ppy-2">Category Name</label>
                            <input type="text" name="Name" defaultValue={singleCategory.name} placeholder="Enter the category name" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label htmlFor="description" className="text-primaryBlue font-semibold text-lg py-2">Category Description</label>
                            <textarea name="description" value={singleCategory.description} placeholder="Enter the category description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full" onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div  className='w-full flex flex-col place-items-start place-content-center px-3 py-2'>
                            <label htmlFor="Image" className="text-primaryBlue font-semibold text-xl py-2">Category Image</label>
                            <>
                            
                            <img src={`${BASE_URL+singleCategory.image}`} alt="image_preview" className="border-2 border-gray-100 p-5 my-5"/>
                            </>
                            
                            <input name='Image'
                            class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                            id="formFileLg"
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                          
                            />
                            
                            
                        </div>





                        
                        <div className='py-2 px-3 flex place-content-center rounded-xl w-full'>
                            <button className='bg-cards rounded-lg text-center px-5 py-2 text-white text-light'>Update</button>
                        </div>
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
