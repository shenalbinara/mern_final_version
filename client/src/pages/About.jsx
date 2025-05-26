import React from 'react'

export const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
       <div className='max-w-2xl mx-auto p-3 text-center'>
          <div className=''>

            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4 inline-block    text-3xl font font-semibold text-center my-7">
                About This Blog
              </h4>
             
             <div className='text-md  text-gray-500 flex flex-col gap-6'> 

              <p>
                Hi, I'm Binara Shenal — the creator of this blog Page. I built this platform to share the latest updates and news in the world of technology, especially focused on new trends and breakthroughs in IT. Anyone interested in staying current with tech can log in and explore insightful articles and posts curated with passion. Whether you're a student, developer, or tech enthusiast, this blog is a space to keep you informed and inspired.
              </p>

             </div>

             <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4 inline-block  text-3xl font font-semibold text-center my-7 ">
                About Me
              </h4>

             <div className='text-md  text-gray-500 flex flex-col gap-6'>

                <p>
                I'm currently an undergraduate student with a deep passion for coding — I love building, learning, and exploring without limits. My primary focus is Python development, and I'm also skilled in creating dynamic front-end experiences using React.js, HTML, and CSS. I enjoy merging design with logic to build full-stack applications, and this blog is one way I combine my love for coding and sharing knowledge with others.
              </p>

             </div>

          </div>

       </div>
    </div>
  )
}
