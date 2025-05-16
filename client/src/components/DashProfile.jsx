import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useState, useRef,  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Ensure these are imported

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function DashProfile() {

    const { currentUser } = useSelector(state => state.user);
    const [ imageFile, setImageFile ] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(file) {

             setImageFile(file);
             setImageFileUrl(URL.createObjectURL(file));


        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();

        }

    }, [imageFile]);


const uploadImage = async () => {
  setImageFileUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile); 
  uploadTask.on(
    'state_changed', // FIXED: correct event name
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadProgress(progress.toFixed(0));
    },
    (error) => {
      setImageFileUploadError('could not uplopad image (File must be less than 2 MB');

      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setFormData({ ...formData, profilePictureL: downloadURL });
      });
    }
  );
};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });

};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (Object.keys(formData).length === 0 ) {
    return;
  }

  console.log("Current User Token:", currentUser.token);  // Check token here

  try {
    dispatch(updateStart());
    console.log('Sending token:', currentUser.token);

    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,  // This should be valid
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      dispatch(updateFailure(data.message));
    } else {
      dispatch(updateSuccess(data));
    }
  } catch (error) {
    dispatch(updateFailure(error.message));
  }
};

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

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
     <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       <div className="hidden">    
       { /* 
  <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-300 to-blue-400 text-white font-semibold rounded-md shadow hover:from-green-400 hover:to-blue-500 transition duration-300">
    Upload Image
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
      ref={filePickerRef}
      
    />
  </label>

      */ }

</div>


        
        <div className='relative w-32 h-32 self-center cursor-auto shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>

            {imageFileUploadProgress && (
                <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} 
                strokeWidth={5}
                styles={{
                    root: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    },
                    path: {
                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                    },
                }}
                
                
                />
            )
        }
            <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="user" 
            className={`rounded-full w-full border-8 object-cover border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 ? 'opacity-60' : ''}`} readOnly  />
            
        </div>

        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>  }
       

         <TextInput
           type='text'
           id='username'
           placeholder='Username'
           defaultValue={currentUser.username} onChange={handleChange}
           readOnly  
         />

         <TextInput
           type='email'
           id='email'
           placeholder='email'
           defaultValue={currentUser.email} onChange={handleChange}
           className='disable'
           readOnly  
         />

         <TextInput
           type='password'
           id='password'
           placeholder='*****'
           defaultValue='*****'
           onChange={handleChange}
           className='hidden'
         />

        <Button
          onClick={handleSignout}
          type="submit"
          className="border border-green-400 text-green-500 hover:text-red-700 hover:bg-gradient-to-r from-green-300 to-blue-300 transition duration-300 rounded-md flex items-center"
        >
          Sign Out
        </Button>

        {
          currentUser.isAdmin && (

            <Link to={'/create-post'}>
               <Button
               type="button"
              className="bg-gradient-to-r w-full from-purple-500 to-rose-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-rose-600 transition">
              Create a post
            </Button>
            
            </Link>
            

          )
        }

{ /* 
<div className='text-red-700 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Acccount</span>
    <span className='cursor-pointer'>Sign Out</span>

</div>

*/ }


     </form>
    </div>
  )
}
