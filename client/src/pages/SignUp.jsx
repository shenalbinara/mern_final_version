import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
          {/* left */}

          <div className='flex-1'>
           <Link to="/" className=' font-bold dark:text-white text-4xl'>
               <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-purple-600 to-gray-500 rounded-lg text-white text-4xl'>Binara's</span>
               Blog
           </Link>
           <p className='text-sm mt-5'>
             this is my paragraph you can do n anything on the this as you relish anytime anywher , and i'm very interesting about python and new programming technology so you can  join with me to seek new areas 
           </p>
          </div>

            { /*   */ }
          <div className='flex-1'>
            <form className='flex flex-col gap-4'>
               <div className=''>
                    <label htmlFor='username' className='text-sm font-medium text-gray-900 dark:text-white'>
                     Your Username
                    </label>
                     <TextInput type='text' id='username' placeholder='Enter your username' required />
               </div>

                <div className=''>
                    <label htmlFor='email' className='text-sm font-medium text-gray-900 dark:text-white'>
                     Your Email
                    </label>
                     <TextInput type='text' id='email' placeholder='Your Email' required />
               </div>

                <div className=''>
                    <label htmlFor='password' className='text-sm font-medium text-gray-900 dark:text-white'>
                     Your Password
                    </label>
                     <TextInput type='text' id='password' placeholder='Enter your password' required />
               </div>

               {/* Submit Button */}
               <Button  type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                 Sign Up
               </Button>

          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Acccount ? </span>
            <Link to='/sign_in' className='text-blue-700'>
               Sign In
            </Link>
          </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp