import { Navbar } from "../Navbar"

export const UserLayout = ({ children }) => {
	return (

		<div className="flex flex-col min-h-screen bg-fourth sm:items-center">
			<Navbar />
			{children}
		</div>

	)
}
