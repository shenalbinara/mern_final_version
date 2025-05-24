import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess()); 
      }
    } catch(error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup className='flex flex- mt-5 inline-block'>
          <Link to='/dashboard?tab=profile'> 
            <SidebarItem 
              as="div"
              active={tab === 'profile'} 
              icon={HiUser} 
              label={currentUser?._id === '68232b44ac8e2ae7222d548a' ? 'Admin' : 'User'}
              labelColor='dark'>
              Profile
            </SidebarItem>
          </Link>
          
          {/* Conditionally render Posts link only for specific user */}
          {currentUser?._id === '68232b44ac8e2ae7222d548a' && (
            <Link to='/dashboard?tab=posts'>
              <SidebarItem
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </SidebarItem>
            </Link>
          
          )}

          {currentUser?._id === '68232b44ac8e2ae7222d548a' && (
            <Link to='/dashboard?tab=users'>
              <SidebarItem
                active={tab === 'posts'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </SidebarItem>
            </Link>
          )}

          <SidebarItem 
            icon={HiArrowSmRight} 
            className='cursor-pointer' 
            label='User' 
            labelColor='dark' 
            onClick={handleSignout}>
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}