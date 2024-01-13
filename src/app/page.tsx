'use client'
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import HomePage from './components/HomePage';

const Pages: React.FC = () => {


  return (
    <main className='bg-[#151415] h-[200vh]'>
      <Navbar />
      <HomePage />
    </main>
  );
};

export default Pages;
