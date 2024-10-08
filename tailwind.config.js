/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#ED7D31',
				secondary: '#6C5F5B',
				third: '#4F4A45',
				fourth: '#F6F1EE'
			}
		},
	},
	plugins: [],
}
