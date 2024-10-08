import { GymCard } from "./GymCard";

export const GymGrid = ({ gyms }) => {
	return (
		<section className="px-2 py-4 w-full flex justify-center">
			<ul className="grid grid-cols-1 gap-3 2xl:gap-5 md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
				{
					gyms.map((g) => (
						<GymCard key={g.id} gym={g} />
					))
				}
			</ul>
		</section>
	);
};
