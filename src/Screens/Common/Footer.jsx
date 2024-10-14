import { NavLink } from "react-router-dom"
import { BackyardigansIcon } from "./Icons/BackyardigansIcon"
import { FacebookIcon } from "./Icons/FacebookIcon"
import { InstagramIcon } from "./Icons/InstagramIcon"
import { LinkedlnIcon } from "./Icons/LinkedlnIcon"
import { TelegramIcon } from "./Icons/TelegramIcon"
import { TiktokIcon } from "./Icons/TiktokIcon"
import { YoutubeIcon } from "./Icons/YoutubeIcon"

export const Footer = () => {
	return (
		<footer className="py-10 mt-auto lg:py-16 xl:py-20 border-t-black border-t-[1px] bg-primary w-full flex flex-col justify-center items-center">
			<div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-7xl  bg-primary lg:grid lg:grid-cols-3 px-4 xl:px-0">
				<section className="flex flex-col items-center justify-center">
					<BackyardigansIcon />
					<p className="text-3xl font-bold uppercase">Gymbros</p>
				</section>

				<section className="flex flex-col gap-4 mt-10">
					<span className="font-bold uppercase xl:text-2xl">menu</span>

					<NavLink className="navlink" to="/" >Inicio</NavLink>
					<NavLink className="navlink" to="/">Registra tu gimnasio</NavLink>
					<NavLink className="navlink" to="/">Mas sobre nosotros</NavLink>


				</section>

				<section className="flex flex-col gap-4 mt-10 ">
					<p className="font-bold uppercase xl:text-2xl">Envia un mensaje a Gymbros</p>
					<ul className="socials flex gap-4">
						<li>
							<NavLink to="https://facebook.com" target="_blank">
								<FacebookIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to="https://instagram.com" target="_blank">
								<InstagramIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to="https://bo.linkedin.com/" target="_blank">
								<LinkedlnIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to="https://web.telegram.org/a/" target="_blank">
								<TelegramIcon />
							</NavLink>
						</li>
						<li>
							<NavLink to="https://youtube.com" target="_blank">
								<YoutubeIcon />
							</NavLink>
						</li>
						<li>
							<a href="https://tiktok.com" target="_blank">
								<TiktokIcon />
							</a>
						</li>
					</ul>
				</section>


				<section className="mt-10 xl:mt-16 lg:col-span-3">
					<p className="text-center">Copyright © {new Date().getFullYear()} Gymbros, All Rights Reserved.</p>
				</section>

			</div>

		</footer>

	)
}
