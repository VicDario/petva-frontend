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
import Custom404 from './views/404';

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
          <Route exact path="/clinic" component={HomeClinic}/>
          <Route exact path="/clinic/profile" component={ClinicProfileDetail}/>
          <Route component={Custom404}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);