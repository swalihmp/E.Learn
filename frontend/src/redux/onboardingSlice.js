import { createSlice } from "@reduxjs/toolkit";


const onboardingSlice = createSlice({
    name:"instructor",
    initialState:{
        onboarding:{
            experience_mode:"",
            experience_type:"",
            subject:"",
            qualification:"",
        }
    },
    reducers:{
        updateonboarding:(state,action)=>{
            state.onboarding=action.payload
        }
    }
})


export const {updateonboarding}=onboardingSlice.actions
export default onboardingSlice.reducer