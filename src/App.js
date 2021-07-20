import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/home';
import Login from './views/login';
import Custom404 from './views/404';
import Navbar from './Components/navbar';
import Register from './views/register';
import injectContext from './store/appContext';
import Userperfil from './views/userperfil';
import Userpets from './views/userpets';
import Addpet from './views/addpet';
import Loginfoundation from './views/loginfoundation';
import FoundationProfile from './views/foundationprofile';
import Userprofiledetail from './views/userprofiledetail';
import Foundationprofiledetail from './views/foundationprofiledetail';
import Foundationpets from './views/foundationpets';
import TransferPetFromFoundation from './views/transferPetFromFoundation';
import Services from './views/services';
import Userpethistory from './views/userpethistory';
import FoundationpetsWO from './views/foundationpetsWO';
import Foundationpethistory from './views/foundationpethistory';
import Petsinadoption from './views/petsinadoption';
import Lostpets from './views/lostpets';
import LoginClinic from './views/loginclinic';
import ClinicProfile from './views/clinicprofile';
import ClinicProfileDetail from './views/clinicprofiledetail';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/user/login" component={Login}/>
          <Route exact path="/user" component={Userperfil}/>
          <Route exact path="/user/pets" component={Userpets}/>
          <Route exact path="/user/pets/add" component={Addpet}/>
          <Route exact path="/foundation/login" component={Loginfoundation}/>
          <Route exact path="/foundation" component={FoundationProfile}/>
          <Route exact path="/user/profile" component={Userprofiledetail} />
          <Route exact path="/foundation/profile" component={Foundationprofiledetail} />
          <Route exact path="/foundation/pets" component={Foundationpets} />
          <Route exact path="/foundation/petsWithOwned" component={FoundationpetsWO} />
          <Route exact path="/foundation/pet/history/:pet_id" component={Foundationpethistory} />
          <Route exact path="/foundation/pets/add" component={Addpet} />
          <Route exact path="/foundation/transfer/:pet_id" component={TransferPetFromFoundation} />
          <Route exact path="/services" component={Services}/>
          <Route exact path="/inAdoption" component={Petsinadoption}/>
          <Route exact path="/lostPets" component={Lostpets}/>
          <Route exact path="/user/pet/history/:pet_id" component={Userpethistory}/>
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
