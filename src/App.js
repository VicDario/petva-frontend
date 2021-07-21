import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Presentation from './views/Presentation';
import Login from './views/Login';
import Custom404 from './views/404';
import Navbar from './Components/Navbar';
import Register from './views/Register';
import injectContext from './store/appContext';
import HomeUser from './views/HomeUser';
import UserPets from './views/UserPets';
import AddPet from './views/AddPet';
import LoginFoundation from './views/LoginFoundation';
import HomeFoundation from './views/HomeFoundation';
import UserProfileDetail from './views/UserProfileDetail';
import FoundationProfileDetail from './views/FoundationProfileDetail';
import FoundationPetsInAdoption from './views/HomeFoundation';
import TransferPetFromFoundation from './views/TransferPetFromFoundation';
import Services from './views/Services';
import UserPetHistory from './views/UserPetHistory';
import FoundationPetsForTracking from './views/FoundationPetsForTracking';
import FoundationPetHistory from './views/FoundationPetHistory';
import PetsInAdoption from './views/PetsInAdoption';
import LostPets from './views/LostPets';
import LoginClinic from './views/LoginClinic';
import ClinicProfile from './views/ClinicProfile';
import ClinicProfileDetail from './views/ClinicProfileDetail';

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
          <Route exact path="/foundation/login" component={LoginFoundation}/>
          <Route exact path="/foundation" component={HomeFoundation}/>
          <Route exact path="/foundation/profile" component={FoundationProfileDetail} />
          <Route exact path="/foundation/pets/adoption" component={FoundationPetsInAdoption} />
          <Route exact path="/foundation/pets/tracking" component={FoundationPetsForTracking} />
          <Route exact path="/foundation/pet/history/:pet_id" component={FoundationPetHistory} />
          <Route exact path="/foundation/pets/add" component={AddPet} />
          <Route exact path="/foundation/transfer/:pet_id" component={TransferPetFromFoundation} />
          <Route exact path="/clinic/login" component={LoginClinic}/>
          <Route exact path="/clinic" component={ClinicProfile}/>
          <Route exact path="/clinic/profile" component={ClinicProfileDetail}/>
          <Route component={Custom404}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);