export const GymInformationCardLayout = ({ children }) => {
	return (
		<section className="flex flex-col px-5 py-10 bg-white rounded-xl max-h-[600px] md:max-h-[700px] shadow-lg gap-2 hover:outline hover:outline-primary">
			{children}
		</section>

	)
}
