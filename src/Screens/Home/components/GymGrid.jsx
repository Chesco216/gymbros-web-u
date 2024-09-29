import { GymCard } from "./GymCard"

const gyms = [
	{
		id: 1,
		name: "gym falcon",
		stars: 3.9,
		number_of_reviews: 123,
		extra_services: [
			"cancha de voleibol "
		],
		image_url: "https://lh5.googleusercontent.com/p/AF1QipOGeHea13YPS1RfeeFMk2Xo31gEvHm-kV4vOE7A=w408-h306-k-no",
		text_address: "Av. Leoncio Prado Gutierrez, Auch Auch"
	},
	{
		id: 2,
		name: "gym evolution",
		stars: 2.9,
		number_of_reviews: 20,
		extra_services: [
			"zumba",
		],
		image_url: "https://lh5.googleusercontent.com/p/AF1QipNQ0dxaTw3WtE-Fi5u_oSGPGJkJc6nX7ODL2a_k=w408-h306-k-no",
		text_address: "Av. Keivi Veizan , Me lele",
	},
	{
		id: 3,
		name: "gym falcon",
		stars: 3.9,
		number_of_reviews: 123,
		extra_services: [
			"boxeo"
		],
		image_url: "https://lh5.googleusercontent.com/p/AF1QipOGeHea13YPS1RfeeFMk2Xo31gEvHm-kV4vOE7A=w408-h306-k-no",
		text_address: "Av. Leoncio Prado Gutierrez, Auch Auch"
	},
	{
		id: 4,
		name: "gym evolution",
		stars: 2.9,
		number_of_reviews: 20,
		extra_services: [
			"zumba",
		],
		image_url: "https://lh5.googleusercontent.com/p/AF1QipNQ0dxaTw3WtE-Fi5u_oSGPGJkJc6nX7ODL2a_k=w408-h306-k-no",
		text_address: "Av. Keivi Veizan , Me lele",
	}
]
export const GymGrid = () => {
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
