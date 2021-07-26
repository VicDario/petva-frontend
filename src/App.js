import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Presentation from './views/Presentation';
import PetsInAdoption from './views/PetsInAdoption';
import LostPets from './views/LostPets';
import Services from './views/Services';
import Login from './views/Login';
import Register from './views/Register';
import injectContext from './store/appContext';
import HomeUser from './views/HomeUser';
import UserPets from './views/UserPets';
import AddPet from './views/AddPet';
import UserProfileDetail from './views/UserProfileDetail';
import UserPetHistory from './views/UserPetHistory';
import LoginFoundation from './views/LoginFoundation';
import HomeFoundation from './views/HomeFoundation';
import FoundationProfileDetail from './views/FoundationProfileDetail';
import FoundationPetsInAdoption from './views/FoundationPetsInAdoption';
import TransferPetFromFoundation from './views/TransferPetFromFoundation';
import FoundationPetsForTracking from './views/FoundationPetsForTracking';
import FoundationPetHistory from './views/FoundationPetHistory';
import LoginClinic from './views/LoginClinic';
import HomeClinic from './views/HomeClinic';
import ClinicProfileDetail from './views/ClinicProfileDetail';
import ClinicCalendar from './views/ClinicCalendar';
import Custom404 from './views/404';
import ReserveTime from './views/ReserveTime';
import DoctorRegister from './views/DoctorRegister';
import ClinicDoctor from './views/ClinicDoctor';
import LoginDoctor from './views/LoginDoctor';
import HomeDoctor from './views/HomeDoctor';
import DoctorProfileDetail from './views/DoctorProfileDetail';
import UserReservations from './views/UserReservations';
import DoctorCalendar from './views/DoctorCalendar';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Presentation}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/adoption" component={PetsInAdoption}/>
          <Route exact path="/lost" component={LostPets}/>
          <Route exact path="/services" component={Services}/>
          <Route exact path="/user/login" component={Login}/>
          <Route exact path="/user" component={HomeUser}/>
          <Route exact path="/user/pets" component={UserPets}/>
          <Route exact path="/user/pets/add" component={AddPet}/>
          <Route exact path="/user/pet/history/:pet_id" component={UserPetHistory}/>
          <Route exact path="/user/profile" component={UserProfileDetail} />
          <Route exact path="/user/reserve" component={ReserveTime}/>
          <Route exact path="/user/reservations" component={UserReservations} />
          <Route exact path="/foundation/login" component={LoginFoundation}/>
          <Route exact path="/foundation" component={HomeFoundation}/>
          <Route exact path="/foundation/profile" component={FoundationProfileDetail} />
          <Route exact path="/foundation/pets/adoption" component={FoundationPetsInAdoption} />
          <Route exact path="/foundation/pets/tracking" component={FoundationPetsForTracking} />
          <Route exact path="/foundation/pet/history/:pet_id" component={FoundationPetHistory} />
          <Route exact path="/foundation/pets/add" component={AddPet} />
          <Route exact path="/foundation/transfer/:pet_id" component={TransferPetFromFoundation} />
          <Route exact path="/clinic/login" component={LoginClinic}/>
          <Route exact path="/clinic" component={HomeClinic}/>
          <Route exact path="/clinic/calendar" component={ClinicCalendar} />
          <Route exact path="/clinic/profile" component={ClinicProfileDetail}/>
          <Route exact path="/clinic/doctor/register" component={DoctorRegister}/>
          <Route exact path="/clinic/doctor" component={ClinicDoctor} />
          <Route exact path="/doctor/login" component={LoginDoctor}/>
          <Route exact path="/doctor" component={HomeDoctor}/>
          <Route exact path="/doctor/profile" component={DoctorProfileDetail}/>
          <Route exact path="/doctor/calendar" component={DoctorCalendar} />
          <Route component={Custom404}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);