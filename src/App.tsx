import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Navbar from "@components/navbar/navbar.component";
import Footer from "@components/footer/footer.component";

import { Context } from "./store/appContext";
import useInitialState from "@hooks/useInitialState";

import { AppRoutes } from "./routes/routes";


function App() {
  return (
    <Context.Provider value={useInitialState}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
