import React, { createContext } from 'react';

import { 
  Outlet, 
} from 'react-router-dom';

import Navbar from '../components/navbar';


export default function RootLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
