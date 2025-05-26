import React from 'react'
import CallToAction from '../components/CallToAction';


const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3 '>
        <h1 className='text-3xl font-semibold'>Projects</h1>
        <p className='text-md text-gray-500'>Writing Codes with FUN and engaging projects while learning Python, React js, HTML, CSS, Next js, Javascript ! </p>
        <CallToAction />
    </div>
  )
}

export default Projects