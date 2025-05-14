import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux';

export default function DashProfile() {

    const { currentUser } = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
     <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
     <form className='flex flex-col gap-4'>
        
        <div className='w-32 h-32 self-center cursor-auto shadow-md overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full border-8 object-cover border-[lightgray]' />
        </div>

         <TextInput
           type='text'
           id='username'
           placeholder='Username'
           defaultValue={currentUser.username} 
         />

         <TextInput
           type='email'
           id='email'
           placeholder='email'
           defaultValue={currentUser.email} 
         />

         <TextInput
           type='password'
           id='password'
           placeholder='*****'
           defaultValue='*****'
         />

        <Button
  type="submit"
  className="border border-green-400 text-green-500 hover:text-white hover:bg-gradient-to-r from-green-300 to-blue-300 transition duration-300 rounded-md flex items-center"
>
  Submit
</Button>

<div className='text-red-700 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Acccount</span>
    <span className='cursor-pointer'>Sign Out</span>

</div>










     </form>
    </div>
  )
}
