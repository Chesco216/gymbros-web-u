import { GymCard } from "./GymCard";

export const GymGrid = ({ gyms }) => {
	return (

		<div className="w-full flex items-center justify-center">
			<section className="w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl">
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-5 2xl:gap-7">
					{
						gyms.map((g) => (
							<GymCard key={g?.id} gym={g} />
						))
					}
				</ul>
			</section>
		</div>

	);
};
