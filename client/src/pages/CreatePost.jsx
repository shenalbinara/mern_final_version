import React, { useRef } from 'react';
import { Button, FileInput, TextInput } from 'flowbite-react';

export default function CreatePost() {
  const editorRef = useRef(null);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML;
    const title = document.getElementById('title').value;
    console.log('Publishing Post:', { title, content });
    // TODO: Add your API call or state logic here
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handlePublish}>
        {/* Title and Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
          <select className="p-2 rounded-md border border-gray-300">
            <option value="">Select a category</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            size="sm"
            className="border w-48 h-10 border-pink-500 text-pink-500 hover:text-gray-700 hover:bg-gradient-to-r from-pink-500 to-red-300 transition duration-300 rounded-md flex items-center"
          >
            Upload Image
          </Button>
        </div>

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
  className="mt-4 w-full text-white font-semibold py-2 rounded-md bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 transition duration-300"
>
  Publish Post
</Button>
      </form>
    </div>
  );
}
