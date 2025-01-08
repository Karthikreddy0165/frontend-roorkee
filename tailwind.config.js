module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
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
  			'bg-slider-blue': '#0000FF'
  		},
  		spacing: {
  			'0.5px': '0.03125rem'
  		},
  		fontSize: {
  			'36px': '36px'
  		},
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			slideUp: {
  				'0%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			slideUp: 'slideUp 0.5s ease-out',
  			slideDown: 'slideDown 0.5s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			none: '0',
  			sm: '0.125rem',
  			DEFAULT: '0.25rem',
  			md: '0.375rem',
  			lg: '0.5rem',
  			full: '9999px',
  			large: '5rem',
  			custom: '0.75rem'
  		}
  	}
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      })
    },
  ],
};
