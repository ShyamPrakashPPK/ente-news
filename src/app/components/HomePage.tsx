import Link from 'next/link'
import React from 'react'


const HomePage = () => {
  return (
      <section className='bg-[#151415] '>
          <div className=' bg-gradient-to-bl from-green-500 to-lime-500 p-10 md:p-20 rounded-3xl   transition duration-300 ease-in-out hover:scale-105 flex flex-col items-center  justify-center m-5 md:m-32 text-center'>
              <h1 className='text-white text-5xl md:text-7xl font-black '>ente news</h1>
              <h3 className='text-gray-300 text-lg md:text-2xl mb-3 '>Latest News and Blogs with ente news</h3>
              <button className='bg-black rounded-xl transition duration-300 ease-in-out hover:scale-110 text-white px-10 py-2 mt-3'>
                  <Link href='/comments'>Go to news</Link>
              </button>
          </div>

          <div className='mb-32 bg-gradient-to-bl from-green-300 to-lime-600 p-10 md:p-20 rounded-3xl  transition duration-300 ease-in-out hover:scale-105 flex flex-col items-center  justify-center m-5 md:m-32 text-center'>
              <h1 className='text-white text-5xl md:text-4xl font-black '>Powered by Hacker News API</h1>
              <h3 className='text-gray-300 text-lg md:text-2xl mb-3 '>Designed and Developer using Next js and Tailwind css</h3>
              <div className='flex  flex-col md:flex-row '>
                  <button className='bg-black mx-2  rounded-xl transition duration-300 ease-in-out hover:scale-110 text-white px-10 py-2 mt-3'>
                      <a href='https://github.com/HackerNews/API' target="_blank" rel="noopener noreferrer" className='text-gray-300 font-bold'>
                          Hacker News API
                      </a>
                  </button>
                  <button className='bg-black mx-2 rounded-xl transition duration-300 ease-in-out hover:scale-110 text-white px-10 py-2 mt-3'>
                      <a href='https://github.com/ShyamPrakashPPK/ente-news' target="_blank" rel="noopener noreferrer" className='text-gray-300 font-bold'>
                          Github Repo
                      </a>
                  </button>
                  <button className='bg-black mx-2 rounded-xl transition duration-300 ease-in-out hover:scale-110 text-white px-10 py-2 mt-3'>
                      <a href='https://nextjs.org/' target="_blank" rel="noopener noreferrer" className='text-gray-300 font-bold'>
                          Next js Documentation
                      </a>
                  </button>
      </div>
          </div>
      </section>
  )
}

export default HomePage