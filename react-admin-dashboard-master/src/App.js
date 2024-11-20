import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";

import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import AdminForm from "./scenes/form";

import Profile from "./scenes/ClientProfile/ClientProfile";

import FAQ from "./scenes/faq";
import Publish from "./scenes/Publish/Publish";
import AdminProfile from "./scenes/AdminProfile/AdminProfile";
import Login from "./scenes/AdminLogin/Login";
import Calendar from "./scenes/calendar/calendar";
import MainLayout from "./layouts/MainLayout";
import "react-pro-sidebar/dist/css/styles.css";
import { useRequireAuth } from "./util/requireAuth";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<MainLayout />}
      errorElement={<p>Error occured</p>}
      loader={async ({ request }) => await useRequireAuth(request)}
    >
      <Route index element={<Dashboard />} />
      <Route
        path="team"
        element={<Team />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />
      <Route
        path="contacts"
        element={<Contacts />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />

      <Route
        path="form"
        element={<AdminForm />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />
      <Route
        path="bar"
        element={<Bar />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />

      <Route
        path="faq"
        element={<FAQ />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />
      <Route
        path="calendar"
        element={<Calendar />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />

      <Route
        path="Profile"
        element={<AdminProfile />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />

      <Route
        path="profile/:clientId"
        element={<Profile />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />
      <Route
        path="publish"
        element={<Publish />}
        loader={async ({ request }) => await useRequireAuth(request)}
      />
    </Route>,

    <Route path="/login" element={<Login />} />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
