import { createSlice } from "@reduxjs/toolkit";


const createcourseSlice = createSlice({
    name:"course",
    initialState:{
        createcourse:{
            title:"",
            subtitle:"",
            description:"",
            category:"",
            subcategory:"",
            image:'',
            promovideo:'',
            welcomemsg:"",
            endmsg:"",
            price:"",
            saleprice:"",
        }
    },
    reducers:{
        updatecreatecourse:(state,action)=>{
            state.createcourse=action.payload
        }
    }
})

export const {updatecreatecourse}=createcourseSlice.actions
export default createcourseSlice.reducer