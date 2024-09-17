import React from 'react'

export default function SignIn() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full pb-16 text-center text-2xl'>
      <div className='w-1/2 bg-white border-solid border-gray-300 border-2 drop-shadow-lg rounded-2xl p-4'>
        <div className='mt-4'>
          <div className='flex justify-center'>
            <img src='/OpenSpot.png' alt='Open Spot Logo' className='h-32'/>
          </div>
          <div className='text-lg text-gray-500 mt-4'>
            Login to your OpenSpot
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <form className='flex flex-col text-xl w-2/4'>
            <div className='flex flex-col mb-10 mt-8'>
              <label className='text-gray-600 self-start mb-2'>Username</label>
              <input className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="text"/>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='text-gray-600 self-start mb-2'>Password</label>
              <input className='rounded-xl h-10 border-solid border-gray-300 border-2 drop-shadow-md pl-4' type="password"/>
            </div>
            <button className='font-bold bg-brand-green mt-4 p-4 text-xl text-white self-center rounded-xl drop-shadow-lg mb-4'>
              <span className='pl-4 pr-4'>Login To OpenSpot</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
