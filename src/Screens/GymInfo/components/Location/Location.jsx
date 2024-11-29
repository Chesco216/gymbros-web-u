import { useFadeIn } from "../../hooks/useFadeIn";

export const Location = ({coords, text}) => {
	const { isVisible, sectionRef } = useFadeIn();
  console.log()
	return (
		<section className={`fade-in-section ${isVisible ? 'is-visible' : ''} flex flex-col px-5 py-10 bg-white rounded-xl max-h-[900px] shadow-lg gap-2 hover:outline hover:outline-primary fade-in-fast`} ref={sectionRef}>
			<p className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Ubicacion</p>
      <p className='font-semibold'>{text}</p>
			<iframe src={coords} width="full" height="700" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
		</section>

	)
}
