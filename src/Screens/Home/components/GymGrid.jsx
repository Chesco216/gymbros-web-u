import { GymCard } from "./GymCard"

export const GymGrid = ({ gyms }) => {
	return (
		<section className="px-2 py-4 2xl:max-w-[2000px]">
			<ul className="gap-3 grid grid-cols-1 2xl:gap-5">

				{
					gyms.map((g) => (
						<GymCard key={g.id} gym={g} />
					))
				}
			</ul>


		</section >
	)
}
