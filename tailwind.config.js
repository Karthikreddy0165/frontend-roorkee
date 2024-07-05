// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend:  {
      colors: {
        'button-blue': '#3F3BE1',
        'custom-gray': '#dddada',
        'dropdown-blue': '#E5F0FF',
        'onclick-btnblue': '#3431BB',
        'dropdown-heading': '#576175',
        'update-bg': '#BAB9FC',
        'update-clr': '#151280',
        'category-border': '#EEF',
        'apply-date': '#D90000',
        'hover-gray': '#F5F5F5',
        'button-text': '#616161',
      },
      spacing: {
        '0.5px': '0.03125rem',
      },
      fontSize: {
        '36px': '36px',
      },
    }
  },
  variants: {},
  plugins: [],
}