/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": 'fade-in .3s ease-in',
        "fade-out": 'fade-out .3s ease-out',
      },
      keyframes: {
				"fade-in": {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
        "fade-out": {
	        from: { opacity: 1 },
					to: { opacity: 0 },
        }
			},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

