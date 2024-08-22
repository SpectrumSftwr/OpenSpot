import React from 'react'
import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full pb-16 bg-brand-100'>
      <SignIn path="/sign-in" />
    </div>
  )
}
