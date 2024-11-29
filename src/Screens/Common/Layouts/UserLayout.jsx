import { ConfirmPopUp } from "../../../components/ConfirmPopUp"
import { Footer } from "../Footer"
import { Navbar } from "../Navbar"
import './UserLayout.css'

export const UserLayout = ({ children }) => {
	return (

		<div className="flex flex-col min-h-screen bg-fourth overflow-custom items-center">
			<Navbar />
			<div className="flex flex-col w-full mt-20 xl:mt-24">
				{children}
			</div>
			<Footer />
      <ConfirmPopUp/>
		</div>

	)
}
