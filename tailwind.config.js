/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				pixelify: ['Pixelify Sans', 'sans-serif'],
				helvetica: ['Helvetica']
			}
		}
	},
	plugins: []
};
