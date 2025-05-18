import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function DashUsers() {
   const { currentUser } = useSelector((state) => state.user)
   const [users, setUsers] = useState([])
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [userIdToDelete, setUserIdToDelete] = useState('');


   

   useEffect(() => {
        const fetchUsers= async () => {
          try {
            const res = await fetch(`/api/user/getusers`);
            const data = await res.json()
            if(res.ok) {
              setUsers(data.users)
              if(data.users.length < 9) {
                setShowMore(false);
              }

            }

          } catch (error) {
            console.log(error.message)

          }
        };
        if(currentUser.isAdmin) {
          fetchUsers();
        }

   }, [currentUser._id])
   
    const handleShowMore = async () => {
  const startIndex = users.length;
  try { 
    const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
    const data = await res.json();

    if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }

  } catch (error) {
    console.log(error.message);
  }
};

  const handleDeleteUser = async () => {

    try {
        const res = await fetch(`/api/user/delete`, {
            method: 'DELETE',

        }) ;
        const data = await res.json();
        if (res.ok) {
            
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));


        } else {
            console.log(data.message);
        }

    } catch (error) {
        console.log(error.message);

    }
  };
   
  return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
     {currentUser.isAdmin ?  (
        <>
            <Table hoverable className='shadow-md'>
                <TableHead>
                   <TableHeadCell>Date Created</TableHeadCell>
                   <TableHeadCell>User Image</TableHeadCell>
                   <TableHeadCell>Username</TableHeadCell>
                   <TableHeadCell>Email</TableHeadCell>
                   <TableHeadCell>Admin</TableHeadCell>
                   <TableHeadCell>Delete</TableHeadCell>
                   
               </TableHead>

                <TableBody className='divide-y'>
  {users.map((user) => (
    <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <TableCell>
        {new Date(user.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell>
  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
    <img 
      src={user.profilePicture} 
      alt={user.username}
      className="w-full h-full object-cover"
    />
  </div>
</TableCell>



      <TableCell>
        {user.username}
      </TableCell>

      <TableCell>
        {user.email}
      </TableCell>

      <TableCell>
          {user.isAdmin ? (
            <FaCheck className='text-green-600' />
          ) : (
            <FaTimes className='text-red-500' />
          )}
      </TableCell>


      <TableCell>
        <span
          onClick={() => {
            setShowModal(true);
            setUserIdToDelete(user._id);
          }} 
          className='font-medium text-red-500 hover:underline cursor-pointer'>
          Delete
        </span>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


                   
                

            </Table>

            {showMore && (

              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                   show more
              </button>
            )
            }

            
        </>
     ): (
      <p>you have no posts yet </p>
     )}
     
     <Modal 
        show={showModal}
        onClose={() => setShowModal(false)} 
        popupsize="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto " />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure want to delete this post?</h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDeleteUser} color="failure" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                Yes, I'm sure
              </Button>

              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

  </div>
}
