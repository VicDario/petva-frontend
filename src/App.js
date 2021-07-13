import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import Home from './views/home';
import Custom404 from './views/404';
import Navbar from './Components/navbar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route component={Custom404}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
