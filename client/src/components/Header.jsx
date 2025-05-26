import { Button, Navbar, NavbarToggle, TextInput, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { NavbarLink, NavbarCollapse } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';


export const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch(); // ✅ You need this line!
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
   

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }

    }, [location.search]);

    const handleSignout = async () => {
    
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
    
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message)
    
        } else {
          
          dispatch(signoutSuccess()); 
        }
    
      } catch(error) {
        console.log(error.message)
    
      }
    };
    
    console.log('currentUser:', currentUser);

    const handleSubmit = (e) => {
       e.preventDefault();
       const urlParams = new URLSearchParams(location.search);
       urlParams.set('searchTerm', searchTerm);
       const searchQuery = urlParams.toString();
       navigate(`/search?${searchQuery}`);

    };


  return (
    <Navbar className='border-b-2'>
      <div className="flex items-center gap-4 md:order-1">
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-purple-600 to-gray-500 rounded-lg text-white'>Binara's</span>
          Blog
        </Link>
        
        
        <form onSubmit={handleSubmit} className="hidden lg:block">
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:order-3">

       <Link to={`/search?searchTerm=${encodeURIComponent(searchTerm)}`}>
  <Button className='w-12 h-10 sm:w-10 sm:h-10 p-2 sm:inline-flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 lg:hidden'>
    <AiOutlineSearch className='w-5 h-5' />
  </Button>
</Link>

        <Button className='w-10 h-10  sm:inline-flex bg-transparent focus:outline-none p-2'  onClick={() => dispatch(toggleTheme())}>
          <div className="rounded-full border-2 border-gray-700 p-1">
            {theme === 'light' ? <FaSun className="text-orange-500 drop-shadow-[0_0_8px_#f97316] text-xl transition duration-300" />

 : <FaMoon className="text-yellow-300 drop-shadow-[0_0_6px_#facc15] text-xl transition duration-300" />
 }
        
          </div>
        </Button>

        {currentUser ? (
        <Dropdown
           arrowIcon={false}
           inline
           label={
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
               <img
                 src={currentUser.profilePicture}
                 alt="User"
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
                      </div>
           }
         >

      <Dropdown
  arrowIcon={false}
  inline
  label={
    <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
      @{currentUser.username}
    </div>
  }
>
  <Dropdown.Item disabled>
    <span className="block text-sm">@{currentUser.username}</span>
  </Dropdown.Item>
</Dropdown>
<DropdownDivider />

<Link to={'/dashboard?tab=profile'}>
   <DropdownItem>Dashboard</DropdownItem>
</Link>
<DropdownDivider />

<Link to={'/dashboard?tab=profile'}>
   <DropdownItem>Profile</DropdownItem>
</Link>
<DropdownDivider />
<DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>


        </Dropdown>

        ): 
        (

           <Link to="/sign_in" className=" sm:block">
          <Button color="blue" className="px-4 py-2" outline>
            Sign In
          </Button>
        </Link>



        ) 



        }

       

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
 
</NavbarCollapse>

      
    </Navbar>
  );
};