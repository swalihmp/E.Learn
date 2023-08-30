import onboardingSlice from "./onboardingSlice"
import createcourseSlice from "./createcourseSlice"
import { configureStore } from "@reduxjs/toolkit"
import courselistSlice from "./courselistSlice"


export default configureStore({
    reducer: {
      onboarding: onboardingSlice,
      createcourse: createcourseSlice,
      courses : courselistSlice,
    },
})