import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { NavbarLink, NavbarCollapse } from 'flowbite-react';

export const Header = () => {
    const path = useLocation().pathname;

  return (
    <Navbar className='border-b-2'>
      <div className="flex items-center gap-4 md:order-1">
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-purple-600 to-gray-500 rounded-lg text-white'>Binara's</span>
          Blog
        </Link>
        
        <form className="hidden lg:block">
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:order-3">
        <Button className='w-12 h-10 sm:w-10 sm:h-10 p-2 sm:inline-flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 lg:hidden'>
          <AiOutlineSearch className='w-5 h-5' />
        </Button>

        <Button className='w-10 h-10 hidden sm:inline-flex bg-transparent focus:outline-none p-2'>
          <div className="rounded-full border-2 border-gray-700 p-1">
            <FaMoon className='text-xl text-gray-700' />
          </div>
        </Button>

        <Link to="/sign-in" className=" sm:block">
          <Button color="blue" className="px-4 py-2">
            Sign In
          </Button>
        </Link>

        <NavbarToggle className="ml-2 sm:ml-0" />
      </div>

      <NavbarCollapse className="md:order-2">
  <NavbarLink 
    as={Link} 
    to='/' 
    className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
  >
    Home
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
  </NavbarLink>
  <NavbarLink 
    as={Link} 
    to='/about' 
    className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
  >
    About
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
  </NavbarLink>
  <NavbarLink 
    as={Link} 
    to='/projects' 
    className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
  >
    Projects
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
  </NavbarLink>
  <NavbarLink 
    as={Link} 
    to='/sign-in' 
    className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 group sm:hidden"
  >
    Sign In
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
  </NavbarLink>
</NavbarCollapse>

      
    </Navbar>
  );
};