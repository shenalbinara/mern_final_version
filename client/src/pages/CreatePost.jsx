import React, { useRef, useState } from 'react';
import { Button, FileInput, TextInput } from 'flowbite-react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate} from 'react-router-dom';

export default function CreatePost() {
  const [file, setFiles] = useState(null);
  const [imageUploadProgress, setImageUploadprogress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const editorRef = useRef(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '_' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadprogress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadprogress(null);
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadprogress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadprogress(null);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPublishError(null);
    setPublishSuccess(null);

    try {
      // Get the content from the contentEditable div
      const content = editorRef.current?.innerHTML || '';
      
      // Prepare the post data
      const postData = {
        ...formData,
        title: e.target.title.value,
        category: e.target.category.value,
        content: content,
        userId: '68232b44ac8e2ae7222d548a' // The user ID you want to send
      };

      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Failed to create post');
        return;
      }

      setPublishSuccess('Post created successfully!');
      navigate(`/post/${data.slug}`)

      // Reset form
      e.target.reset();
      editorRef.current.innerHTML = '';
      setFormData({});
    } catch (error) {
      setPublishError('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title and Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput 
            type="text"
            placeholder="Title" 
            required 
            id="title" 
            name="title" 
            className="flex-1"
          />

          <select 
            name="category"
            className="p-2 rounded-md border border-gray-300" 
            required
          >
            <option value="">Select a category</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" id="file" accept="image/*" onChange={(e) => setFiles(e.target.files[0])} />
          <Button
            type="button"
            size="sm"
            className="border w-48 h-10 border-pink-500 text-pink-500 hover:text-gray-700 hover:bg-gradient-to-r from-pink-500 to-red-300 transition duration-300 rounded-md flex items-center"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <div className="text-red-500">{imageUploadError}</div>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Font Size Selector */}
        <div className="flex items-center gap-2 border rounded-md p-2 bg-gray-100">
          <label htmlFor="font-size" className="text-sm">Font Size:</label>
          <select
            id="font-size"
            className="p-1 border border-gray-300 rounded"
            onChange={(e) => format('fontSize', e.target.value)}
          >
            <option value="1">Very Small</option>
            <option value="2">Small</option>
            <option value="3" defaultValue>Normal</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">Very Large</option>
            <option value="7">Huge</option>
          </select>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-100">
          {[
            { label: 'Bold', cmd: 'bold' },
            { label: 'Italic', cmd: 'italic' },
            { label: 'Underline', cmd: 'underline' },
            { label: 'H1', cmd: 'formatBlock', value: 'h1' },
            { label: 'H2', cmd: 'formatBlock', value: 'h2' },
            { label: 'H3', cmd: 'formatBlock', value: 'h3' },
            { label: 'H4', cmd: 'formatBlock', value: 'h4' },
            { label: 'UL', cmd: 'insertUnorderedList' },
            { label: 'OL', cmd: 'insertOrderedList' },
          ].map(({ label, cmd, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => format(cmd, value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-teal-100 transition"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[200px] border border-gray-300 rounded-md p-4 focus:outline-none"
          placeholder="Write your post here..."
        ></div>

        {/* Publish Post Button */}
        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full text-white font-semibold py-2 rounded-md bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 transition duration-300"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </Button>
        
        {publishError && <div className="text-red-500 text-center">{publishError}</div>}
        {publishSuccess && <div className="text-green-500 text-center">{publishSuccess}</div>}
      </form>
    </div>
  );
}