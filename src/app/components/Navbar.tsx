'use client'
import { useState } from 'react'

export default function Navbar() {

    return (
        <header className="bg-[#151415] border-b-[1px] border-gray-500">
            <nav className="    p-6 lg:px-8" aria-label="Global">
                <h1 className='text-center text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br  from-green-500 to-lime-500 hover:text-white transition-colors duration-300 ease-in-out font-extrabold'>ente news</h1>
            </nav>
        </header>
    )
}
