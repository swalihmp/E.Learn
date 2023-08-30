import { Route,Routes,useLocation} from 'react-router-dom'
import Signup from "./User/Signup";
import Login from './User/Login';
import Ahome from './Admin/Ahome';
import Onboard from './Instructor/OnboardingForm';
import Home from './User/Home';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import Course from './User/Course';
import Students from './Admin/Students'
import SingleCourse from './User/SingleCourse';
import Admincourse from './Admin/Admincourse';
import Admincategory from './Admin/Admincategory';
import Addcategory from './Admin/Addcategory';
import Editcategory from './Admin/Editcategory';
import InstructorHome from './Instructor/InstructorHome';
import Cart from './User/Cart';
import InstructorCourse from './Instructor/course/InstructorCourse';
import CreateCourse from './Instructor/course/CreateCourse';
import Checkout from './User/Checkout'
import InstructorSingleCourse from './Instructor/course/InstructorSingleCourse';
import AddSession from './Instructor/course/AddSession';
import AddMaterial from './Instructor/course/AddMaterial';
import AsingleCourse from './Admin/AsingleCourse';
import AdminInstructors from './Admin/AdminInstructors';
import Addsubcategory from './Admin/Addsubcategory';
import Subcategory from './Admin/Subcategory';
import Editcourse from './Instructor/course/Editcourse';
import Profile from './User/Profile';
import Changepassword from './User/Changepassword';
import Orderhistory from './User/Orderhistory';
import Mylearnings from './User/Mylearnings';
import Invoice from './User/Invoice';
import Coupon from './Admin/Coupon';
import Courseattend from './User/Courseattend';
import Rating from './User/Rating';
import Chat from './User/Chat';
import Profileimage from './User/Profileimage';
import SalesReport from './Admin/SalesReport';

function Proutes() {

    const location = useLocation();
    return (
      <Routes location={location} key={location.pathname}>
        <Route path='/' exact>
            <Route path='/' exact element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='forgotp' element={<ForgotPassword/>}/>
            <Route path='reset-password' Component={<ResetPassword/>} />
            <Route path='course' Component={Course}/>
            <Route path='students' Component={Students}/>
            <Route path='/course-details/:id' element={<SingleCourse />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='checkout' element={<Checkout/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='changepass' element={<Changepassword/>}/>
            <Route path='/invoice/:id' element={<Invoice/>}/>
            <Route path='orderhistory' element={<Orderhistory/>}/>
            <Route path='mylearning' element={<Mylearnings/>}/>
            <Route path='/attendcourse/:id' element={<Courseattend/>}/>
            <Route path='ratings' element={<Rating/>}/>
            <Route path='chat' element={<Chat/>}/>
            <Route path='profileimage' element={<Profileimage/>}/>


            <Route path='ahome' element={<Ahome/>}/>
            <Route path='acourses' element={<Admincourse/>}/>
            <Route path='acategory' element={<Admincategory/>}/>
            <Route path='subcategory' element={<Subcategory/>}/>
            <Route path='Addcategory' element={<Addcategory/>}/>
            <Route path='Addsubcategory' element={<Addsubcategory/>}/>
            <Route path='EditCategory' element={<Editcategory/>}/>
            <Route path='adminsinglecourse/:id' element={<AsingleCourse/>}/>
            <Route path='Admininstructor' element={<AdminInstructors/>}/>
            <Route path='coupon' element={<Coupon/>}/>
            <Route path='salesreport' element={<SalesReport/>}/>


            <Route path='Onboard' element={<Onboard/>}/>
            <Route path='InstructHome' element={<InstructorHome/>}/>
            <Route path='InstructorCourse' element={<InstructorCourse/>}/>
            <Route path='createcourse' element={<CreateCourse/>}/>
            <Route path='isinglecourse/:id' element={<InstructorSingleCourse/>}/>
            <Route path='addsession' element={<AddSession/>}/>
            <Route path='addmaterial' element={<AddMaterial/>}/>
            <Route path='editcourse' element={<Editcourse/>}/>
        </Route>

      </Routes>
  )
}

export default Proutes