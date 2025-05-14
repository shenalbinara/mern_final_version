import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import  {  useState } from 'react';



export default function DashSidebar() {

  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const tabFormUrl = urlParams.get('tab');
  if (tabFormUrl) {
    setTab(tabFormUrl); // ✅ corrected line
  }
}, [location.search]);


  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile'> 
                <SidebarItem active={tab === 'profile'} icon={HiUser} label='User' labelColor='dark'>
                    Profile
                </SidebarItem>
                </Link>
                <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' label='User' labelColor='dark'>
                    Sign Out
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
