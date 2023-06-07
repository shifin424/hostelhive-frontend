import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import Locaion from "../Components/Landing/Location/Locaion";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/LoginPage'
import AddHostel from '../Pages/HostelAdmin/AddHostel'
import HostelAdmin from '../Verification/hostelAdminVerification'
import Notification from "../Pages/HostelAdmin/Notification";
import DashBoard from "../Pages/HostelAdmin/DashBoard";
import GlobalHostelLayout from "../Components/HostelAdmin/GlobalHostelLayout";
import AddHostelButton from "../Components/HostelAdmin/AddHostelButton";
import SingleDashboard from "../Pages/HostelAdmin/SingleDashboard";
import SingleHostelLayouts from "../Components/HostelAdmin/SingleHostelLayouts";
import RoomsListing from "../Pages/HostelAdmin/RoomsListing";


const hostelRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<HostelAdmin> <Register /></HostelAdmin>}></Route>
      <Route path="/otpVerification" element={<HostelAdmin><OtpPage /> </HostelAdmin>}></Route>
      <Route path="/login" element={<HostelAdmin><Login /> </HostelAdmin>}></Route>
      <Route path='/notification' element={<Notification />}></Route>

      <Route element={<GlobalHostelLayout />}>
        <Route path="/hostel-listing" element={<HostelAdmin><AddHostelButton /></HostelAdmin>}></Route>
        <Route path="/add-hostel" element={<HostelAdmin><AddHostel /></HostelAdmin>}></Route>
        <Route path="/dashboard" element={<HostelAdmin><DashBoard /></HostelAdmin>}></Route>
      </Route>

      <Route element={<SingleHostelLayouts />}>
        <Route path="/hostel-listing/dashboard" element={<SingleDashboard />}></Route>
        <Route path="/hostel-listing/rooms" element={<RoomsListing/>}></Route>
      </Route>

    </Routes>
  );
};

export default hostelRoutes;