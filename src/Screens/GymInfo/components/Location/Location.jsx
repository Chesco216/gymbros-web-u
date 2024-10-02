export const Location = ({ coords_address }) => {
	return (
		<section className="flex flex-col px-5 py-10 bg-white rounded-xl max-h-[600px] md:max-h-[700px] shadow-lg gap-2 hover:outline hover:outline-primary">
			<p className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Ubicacion</p>
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.888131107614!2d-68.08989652446667!3d-16.531744384216807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f219c5686df33%3A0xbfb01aa352ca9442!2sUFC%20GYM%20La%20Paz!5e0!3m2!1ses!2sbo!4v1727887252442!5m2!1ses!2sbo" width="full" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

		</section>

	)
}
