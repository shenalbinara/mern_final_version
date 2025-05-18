import React, { useRef, useState, useEffect } from 'react';
import { Button, FileInput, TextInput } from 'flowbite-react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const editorRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to load post');
        }

        setFormData(data.posts[0] || {});
        setEditorReady(true); // Mark editor as ready after data loads
      } catch (error) {
        setPublishError(error.message);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  // Initialize editor content
  useEffect(() => {
    if (editorReady && editorRef.current && formData.content) {
      try {
        editorRef.current.innerHTML = formData.content;
      } catch (error) {
        console.error("Error initializing editor content:", error);
      }
    }
  }, [formData.content, editorReady]);

  // Image upload handler
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    setImageUploadError(null);
    setImageUploadProgress(0);

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '_' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPublishError(null);
    setPublishSuccess(null);

    try {
      // Validate editor content
      if (!editorRef.current) {
        throw new Error('Editor not initialized');
      }

      const content = editorRef.current.innerHTML;
      if (!content || content === '<br>' || content === '<div><br></div>') {
        throw new Error('Post content cannot be empty');
      }

      const postData = {
        ...formData,
        title: e.target.title.value,
        category: e.target.category.value,
        content,
        userId: currentUser._id,
      };

      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update post');
      }

      setPublishSuccess('Post updated successfully!');
      setTimeout(() => navigate(`/post/${data.slug}`), 1500);
    } catch (error) {
      setPublishError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Text formatting helper
  const format = (command, value = null) => {
    try {
      if (editorRef.current) {
        document.execCommand(command, false, value);
        editorRef.current.focus();
      }
    } catch (error) {
      console.error("Formatting error:", error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
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
            value={formData.title || ''}
            onChange={handleChange}
          />

          <select
            name="category"
            className="p-2 rounded-md border border-gray-300"
            required
            value={formData.category || ''}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            size="sm"
            className="border w-48 h-10 border-pink-500 text-pink-500 hover:text-gray-700 hover:bg-gradient-to-r from-pink-500 to-red-300 transition duration-300 rounded-md flex items-center"
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && (
          <div className="text-red-500">{imageUploadError}</div>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover rounded-md"
          />
        )}

        {/* Editor Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 border rounded-md p-2 bg-gray-100">
            <label htmlFor="font-size" className="text-sm">
              Font Size:
            </label>
            <select
              id="font-size"
              className="p-1 border border-gray-300 rounded"
              onChange={(e) => format('fontSize', e.target.value)}
              defaultValue="3"
            >
              <option value="1">Very Small</option>
              <option value="2">Small</option>
              <option value="3">Normal</option>
              <option value="4">Medium</option>
              <option value="5">Large</option>
              <option value="6">Very Large</option>
              <option value="7">Huge</option>
            </select>
          </div>

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
                className="border border-gray-400 rounded px-3 py-1 text-sm hover:bg-gray-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor with placeholder */}
        <div className="relative">
          {/* Placeholder */}
          {!formData.content && (
            <div
              className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none"
              style={{ userSelect: 'none' }}
            >
              Write your post here...
            </div>
          )}

          {/* ContentEditable div */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[200px] border border-gray-300 rounded-md p-4 focus:outline-none"
            onInput={(e) => {
              if (e.currentTarget) {
                setFormData((prev) => ({ ...prev, content: e.currentTarget.innerHTML }));
              }
            }}
            spellCheck={true}
            suppressContentEditableWarning={true}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 transition duration-300"
        >
          {loading ? 'Updating...' : 'Update Post'}
        </Button>
      </form>

      {/* Feedback Messages */}
      {publishError && (
        <p className="mt-3 p-2 rounded-md bg-red-200 text-red-700">{publishError}</p>
      )}
      {publishSuccess && (
        <p className="mt-3 p-2 rounded-md bg-green-200 text-green-700">{publishSuccess}</p>
      )}
    </div>
  );
}
