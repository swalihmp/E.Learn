import { createSlice } from "@reduxjs/toolkit";

const courselistSlice = createSlice({
    name : "course",
    initialState :{
        courses:[],
        searchdata:null,
    },
    reducers:{
        updatecourselist:(state,action)=>{
            state.courses = action.payload
        },
        updatesearchdata:(state,action)=>{
            state.searchdata = action.payload
        }

    }
})

export const {updatecourselist,updatesearchdata}=courselistSlice.actions
export default courselistSlice.reducer