import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Alert, Spinner } from 'flowbite-react';

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate('/');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-purple-600 to-gray-500 rounded-lg text-white text-4xl'>Binara's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is my paragraph you can do anything on this as you relish anytime anywhere, and I'm very interested about Python and new programming technology so you can join with me to seek new areas.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-900 dark:text-white'>
                Your Email
              </label>
              <TextInput 
                type='email' 
                id='email' 
                placeholder='Your Email'   
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-900 dark:text-white'>
                Your Password
              </label>
              <TextInput 
                type='password' 
                id='password' 
                placeholder='*****'   
                onChange={handleChange} 
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
          </form>
          
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have An Account ?</span>
            <Link to='/sign_up' className='text-blue-700'>
              Sign Up
            </Link>
          </div>
          
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};