import { GymCard } from "./GymCard"

export const GymGrid = ({ gyms }) => {
	return (
		<section className="px-2 py-4 ">
			<ul className="flex flex-col gap-3 2xl:gap-5">

				{
					gyms.map((g) => (
						<GymCard key={g.id} gym={g} />
					))
				}
			</ul>


		</section >
	)
}
