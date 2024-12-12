import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import injectContext from "./store/appContext";

import Presentation from "./pages/presentation.page";
import PetsInAdoption from "./pages/pets-in-adoption.page";
import LostPets from "./pages/lost-pets.page";
import Services from "./pages/services.page";
import Login from "./pages/login-user.page";
import Register from "./pages/register.page";
import HomeUser from "./pages/home-user.page";
import UserPets from "./pages/user-pets.page";
import AddPet from "./pages/add-pet.page";
import UserProfileDetail from "./pages/user-profile-detail.page";
import UserPetHistory from "./pages/user-pet-history";
import LoginFoundation from "./pages/login-foundation.page";
import HomeFoundation from "./pages/home-foundation.page";
import FoundationProfileDetail from "./pages/foundation-profile-detail";
import FoundationPetsInAdoption from "./pages/foundation-pets-in-adoption.page";
import TransferPetFromFoundation from "./pages/transfer-pet-from-foundation.page";
import FoundationPetsForTracking from "./pages/foundation-pets-for-tracking";
import FoundationPetHistory from "./pages/foundation-pet-history.page";
import LoginClinic from "./pages/login-clinic.page";
import HomeClinic from "./pages/home-clinic.page";
import ClinicProfileDetail from "./pages/clinic-profile-detail.page";
import ClinicCalendar from "./pages/clinic-calendar.page";
import Custom404 from "./pages/not-found.page";
import ReserveTime from "./pages/reserve-time.page";
import DoctorRegister from "./pages/doctor-register.page";
import ClinicDoctor from "./pages/clinic-doctor.page";
import LoginDoctor from "./pages/login-doctor.page";
import HomeDoctor from "./pages/home-doctor.page";
import DoctorProfileDetail from "./pages/doctor-profile-detail.page";
import UserReservations from "./pages/user-reservations";
import DoctorCalendar from "./pages/doctor-calendar.page";
import DoctorAttending from "./pages/doctor-attending.page";
import Contact from "./pages/contact.page";

import Navbar from "./Components/navbar.component";
import Footer from "./Components/footer.component";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Presentation/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/adoption" element={<PetsInAdoption/>} />
        <Route path="/lost" element={<LostPets/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user" element={<HomeUser/>} />
        {/* <Route path="/user/pets" element={<UserPets/>} />
        <Route path="/user/pets/add" element={<AddPet/>} /> */}
        <Route path="/user/pet/history/:pet_id" element={<UserPetHistory/>} />
        <Route path="/user/profile" element={<UserProfileDetail/>} />
        <Route path="/user/reserve" element={<ReserveTime/>} />
        <Route path="/user/reservations" element={<UserReservations/>} />
        <Route path="/foundation/login" element={<LoginFoundation/>} />
        <Route path="/foundation" element={<HomeFoundation/>} />
        <Route path="/foundation/profile" element={<FoundationProfileDetail/>} />
        <Route
          path="/foundation/pets/adoption"
          element={<FoundationPetsInAdoption/>}
        />
        <Route
          path="/foundation/pets/tracking"
          element={<FoundationPetsForTracking/>}
        />
        <Route
          path="/foundation/pet/history/:pet_id"
          element={<FoundationPetHistory/>}
        />
        {/* <Route path="/foundation/pets/add" element={<AddPet/>} /> */}
        <Route
          path="/foundation/transfer/:pet_id"
          element={<TransferPetFromFoundation/>}
        />
        <Route path="/clinic/login" element={<LoginClinic/>} />
        <Route path="/clinic" element={<HomeClinic/>} />
        <Route path="/clinic/calendar" element={<ClinicCalendar/>} />
        <Route path="/clinic/profile" element={<ClinicProfileDetail/>} />
        <Route path="/clinic/doctor/register" element={<DoctorRegister/>} />
        <Route path="/clinic/doctor" element={<ClinicDoctor/>} />
        <Route path="/doctor/login" element={<LoginDoctor/>} />
        <Route path="/doctor" element={<HomeDoctor/>} />
        <Route path="/doctor/profile" element={<DoctorProfileDetail/>} />
        <Route path="/doctor/calendar" element={<DoctorCalendar/>} />
        <Route
          path="/doctor/attending/:reservation_id/:pet_id"
          element={<DoctorAttending/>}
        />
        <Route path="/contact" element={<Contact/>} />
        <Route element={<Custom404/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default injectContext(App);
