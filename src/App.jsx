import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { YMaps, Map } from '@pbe/react-yandex-maps';


import MapPage from './pages/Map'
import HomePage from './pages/Home';
import ImagesPage from './pages/Images';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TestPage from './pages/Test';

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
    path: 'images',
    element: <ImagesPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'test',
    element: <TestPage />
  }
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
