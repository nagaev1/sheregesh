import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { YMaps, Map } from '@pbe/react-yandex-maps';


import MapPage from './pages/Map'
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "",
    element: <MapPage />,
  },
  {
    path: 'map',
    element: <MapPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'profile',
    element: <ProfilePage  />
  },
]);

function App() {
  return (
  <YMaps>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </YMaps>
  );
}

export default App;
