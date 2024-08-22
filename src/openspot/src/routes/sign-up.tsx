import React from 'react'
import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {

  const handleSignUpClick = () => {

  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full pb-16 bg-brand-100'>
      <SignUp path="/sign-up" />
    </div>
  )
}
