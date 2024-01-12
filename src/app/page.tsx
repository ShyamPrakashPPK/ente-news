'use client'
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';

const Pages: React.FC = () => {
 

  return (
    <main className='bg-[#151415] h-[100vh]'>
      <Navbar/>
      <section className=''>
        <div className=' bg-gradient-to-bl from-green-500 to-lime-500 p-10 md:p-20 rounded-3xl   transition duration-300 ease-in-out hover:scale-105 flex flex-col items-center  justify-center m-5 md:m-32 text-center'>
          <h1 className='text-white text-5xl md:text-7xl font-black '>ente news</h1>
          <h3 className='text-gray-300 text-lg md:text-2xl mb-3 '>Latest News and Blogs with ente news</h3>
          <button className='bg-black rounded-xl transition duration-300 ease-in-out hover:scale-110 text-white px-10 py-2 mt-3'>
            <Link href='/news'>Go to news</Link>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Pages;
