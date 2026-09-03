/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['P22 Mackinac W01 Book', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: {
          DEFAULT: '#07090E',
          card: '#0F172A',
          border: '#1E293B',
          hover: '#182238',
        },
      },
    },
  },
  plugins: [],
};
