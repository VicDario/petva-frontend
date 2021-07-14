import { BrowserRouter, Route,Switch } from 'react-router-dom';
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

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/user" component={Userperfil}/>
          <Route exact path="/userpets" component={Userpets}/>
          <Route exact path="/addpetuser" component={Addpet}/>
          <Route component={Custom404}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default injectContext(App);
