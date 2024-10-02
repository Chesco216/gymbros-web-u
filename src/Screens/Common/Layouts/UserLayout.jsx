import { Navbar } from "../Navbar"
import './UserLayout.css'

export const UserLayout = ({ children }) => {
	return (

		<div className="flex flex-col min-h-screen bg-fourth overflow-custom">
			<Navbar />
			<div className="flex flex-col min-h-screen justify-center sm:items-center w-full">
				{children}
			</div>
		</div>

	)
}
