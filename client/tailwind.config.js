/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Add this line - crucial for dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
     require('tailwind-scrollbar'),
    
    ],
};