export const ExtraServices = ({ extra_services }) => {
	return (
		<section className="flex flex-col px-5 py-10 bg-white rounded-xl max-h-[600px] md:max-h-[700px] shadow-lg gap-2 hover:outline hover:outline-primary">
			<p className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Servicios Extras</p>
			<ul className="list-disc flex flex-col px-5 my-5 text-gray-600">
				{
					extra_services.map((es, index) =>
						<li className="capitalize" key={index}>{es}</li>
					)
				}
			</ul>
		</section>
	)
}
