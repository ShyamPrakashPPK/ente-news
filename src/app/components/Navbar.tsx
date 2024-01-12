'use client'
import {useState } from 'react'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-gray-900 border-b-[1px] border-gray-700">
            <nav className="mx-auto flex  items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">  
                    <h1 className='md:text-4xl text-green-500 hover:text-white transition-colors duration-300 ease-in-out font-extrabold'>ente news</h1>
                </div>
            </nav>
        </header>
    )
}
