export const AboutUs = () => {
	return (
		<div className="px-2 py-10 xl:py-16 mt-10 bg-gray-200 w-full flex justify-center items-center">

			<section className="px-2 py-4 flex gap-4 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-7xl items-center">
				<header className="flex flex-col gap-5">
					<h2 className="text-lg font-bold sm:text-xl xl:text-2xl">
						¡Encuentra tu gimnasio ideal en La Paz!
					</h2>
					<p className="font-light sm:text-lg xl:text-xl">
						Con GymBros, la búsqueda de tu gimnasio perfecto nunca ha sido tan fácil. Ahora puedes descubrir los mejores gimnasios en la ciudad, conocer sus instalaciones, entrenadores y mucho más, ¡todo desde la comodidad de tu casa!

						¿Listo para entrenar? ¡Lo tienes! Explora gimnasios con equipos de última generación, entrenadores especializados y programas adaptados a tus metas. Ya sea que busques entrenamiento funcional, pesas o yoga, con GymBros encuentras exactamente lo que necesitas.

						En pocos pasos podrás elegir el gimnasio que más te guste, inscribirte y empezar a entrenar. ¡Descubre, elige y ponte en forma con GymBros hoy mismo!
					</p>

				</header>
				<img className="hidden xl:flex" src="/imggym.png" alt="" />

			</section>
		</div>

	)
}
