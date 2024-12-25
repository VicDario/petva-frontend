import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Navbar from "@components/navbar/navbar.component";
import Footer from "@components/footer/footer.component";

import { Context } from "@context/appContext";
import useInitialState from "@hooks/useInitialState";

import { AppRoutes } from "./routes/routes";

function App() {
  const initialState = useInitialState();
  return (
    <Context.Provider value={initialState}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
