import { ClassNames } from '@emotion/react';
import React from 'react';

import { 
  Outlet, 
} from 'react-router-dom';
import { Footer } from '../components/footer';

import Navbar from '../components/navbar';


export default function RootLayout() {
  return (
    <div className='h-full'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
