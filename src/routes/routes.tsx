import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LostPets = lazy(() => import("@pages/lost-pets.page"));
const PetsInAdoption = lazy(() => import("@pages/pets-in-adoption.page"));
const Presentation = lazy(() => import("@pages/presentation.page"));
const Register = lazy(() => import("@pages/common/register/register.page"));
const Services = lazy(() => import("@pages/services.page"));
const Login = lazy(() => import("@pages/common/login/login.page"));

const Custom404 = lazy(() => import("@pages/not-found.page"));

export function AppRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<>...</>}>
            <Presentation />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<>...</>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<>...</>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="adoption"
        element={
          <Suspense fallback={<>...</>}>
            <PetsInAdoption />
          </Suspense>
        }
      />
      <Route
        path="lost-pest"
        element={
          <Suspense fallback={<>...</>}>
            <LostPets />
          </Suspense>
        }
      />
      <Route
        path="services"
        element={
          <Suspense fallback={<>...</>}>
            <Services />
          </Suspense>
        }
      />
      <Route
        element={
          <Suspense fallback={<>...</>}>
            <Custom404 />
          </Suspense>
        }
      />
    </Routes>
  );
}
