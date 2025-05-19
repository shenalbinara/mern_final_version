import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col '>
            <h2 className='text-2xl'>
                want to learn more about JavaScript !
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <Button
                type="button"
                className="bg-gradient-to-r  from-purple-500 to-rose-500 text-white   shadow-md hover:from-purple-600 hover:to-rose-600 transition rounded-tl-xl rounded-bl-none">
                <a href="#" target='_blank' rel='noopener noreferrer'>Java script projects</a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="/images/download.png" alt="binara" />
         

        </div>
      
    </div>
  )
}
